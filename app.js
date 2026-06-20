/* Fitness Coach v38 Safe Initial Load */
(function(){
  "use strict";

  const $ = id => document.getElementById(id);
  const todayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const safeParse = (k,f) => { try { return JSON.parse(localStorage.getItem(k) || "null") ?? f; } catch(e){ return f; } };
  const safeSave = (k,v) => localStorage.setItem(k, JSON.stringify(v));
  const workoutMap = {
    0:"Sunday - Recovery / Rest Day",
    1:"Monday - Upper Body Strength",
    2:"Tuesday - Lower Body Strength",
    3:"Wednesday - Conditioning + Core",
    4:"Thursday - Upper Body Muscle Building",
    5:"Friday - Lower Body + Conditioning",
    6:"Saturday - Recovery / Rest Day"
  };

  function setText(id, text){ const el = $(id); if(el) el.textContent = text; }
  function profile(){ return safeParse("userProfile", null); }
  function goalWeight(){ const p = profile(); const g = Number(p?.goalWeight); return Number.isFinite(g) && g > 0 ? g : 195; }

  function latestWeight(){
    const p = profile();
    let logs = safeParse("progressLogs", []);
    if(!Array.isArray(logs)) logs = [];
    const rows = logs.map(l => Number(l.bodyWeight ?? l.weight)).filter(Number.isFinite);
    return rows.length ? rows[rows.length - 1] : (Number(p?.weight) || null);
  }

  function renderToday(){
    const now = new Date();
    const p = profile();
    const goal = goalWeight();
    const current = latestWeight();

    document.title = `Fitness Coach - Goal ${goal}`;
    setText("goalWeightHeader", `Goal Weight: ${goal} lbs`);

    if(current){
      const remaining = Math.round((current - goal) * 10) / 10;
      setText("goalProgressHeader", Math.abs(remaining) <= 2 ? `Current: ${current} lbs • Goal/maintenance range` : remaining > 0 ? `Current: ${current} lbs • ${remaining} lbs to goal` : `Current: ${current} lbs • ${Math.abs(remaining)} lbs below goal`);
    } else {
      setText("goalProgressHeader", "Complete the Initial Assessment to personalize your goal.");
    }

    setText("todayDayName", now.toLocaleDateString(undefined,{weekday:"long"}));
    setText("todayDateText", now.toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"}));
    setText("todayTimeText", now.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}));
    setText("todayWorkoutText", workoutMap[now.getDay()]);
    setText("todayWorkoutStatus", "Ready");

    const hour = now.getHours();
    let action = p ? "Follow today’s plan." : "Complete your Initial Assessment first.";
    if(p && hour >= 15 && hour < 18) action = "Workout window is open. Start when ready.";
    if(p && hour >= 18) action = "Review workout, protein, hydration, and recovery.";
    setText("todayNextAction", action);
  }

  function initTabs(){
    document.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        const target = $(btn.dataset.tab);
        if(target) target.classList.add("active");
        if(btn.dataset.tab === "assessment") showProfilePreview();
      });
    });
  }

  const wizard = {step:0, data:{}};
  function showStep(n){
    const steps = [...document.querySelectorAll(".rpg-step")];
    const max = Math.max(0, steps.length - 1);
    wizard.step = Math.max(0, Math.min(max, n));
    steps.forEach(s => s.classList.toggle("active", Number(s.dataset.rpgStep) === wizard.step));
    const bar = $("rpgProgressBar");
    if(bar) bar.style.width = max ? `${Math.round((wizard.step/max)*100)}%` : "0%";
  }
  function num(id){ const n = Number($(id)?.value || 0); return Number.isFinite(n) ? n : 0; }
  function collectWizard(){
    wizard.data.name = $("rpgName")?.value.trim() || wizard.data.name || "User";
    wizard.data.age = num("rpgAge") || wizard.data.age || "";
    wizard.data.feet = num("rpgFeet") || wizard.data.feet || "";
    wizard.data.inches = num("rpgInches") || wizard.data.inches || "";
    wizard.data.weight = num("rpgWeight") || wizard.data.weight || "";
    wizard.data.goalWeight = num("rpgGoalWeight") || wizard.data.goalWeight || 195;
  }
  function scoreWizard(){
    const walk = Math.min(40, (num("rpgWalkDistance") / 0.5) * 40);
    const chair = Math.min(25, (num("rpgChair") / 20) * 25);
    const push = Math.min(20, (num("rpgPushups") / 20) * 20);
    const plank = Math.min(15, (num("rpgPlank") / 90) * 15);
    const effortPenalty = Math.max(0, (num("rpgEffort") - 7) * 5);
    const overall = Math.max(0, Math.round(walk + chair + push + plank - effortPenalty));
    let classification = "Beginner";
    if(overall >= 70) classification = "Intermediate";
    else if(overall >= 45) classification = "Novice";
    return {
      overallFitnessScore: overall,
      classification,
      recoveryRisk: $("rpgConcerningSymptoms")?.checked ? "Elevated" : "Low"
    };
  }
  function finishWizard(){
    collectWizard();
    const scores = scoreWizard();
    const p = {
      name: wizard.data.name,
      age: wizard.data.age,
      feet: wizard.data.feet,
      inches: wizard.data.inches,
      weight: wizard.data.weight,
      goalWeight: wizard.data.goalWeight,
      startingClass: wizard.data.startingClass || "explorer",
      bodyType: wizard.data.bodyType || "average",
      fitnessClassification: scores.classification,
      recoveryRisk: scores.recoveryRisk,
      onboardingComplete: true,
      updatedAt: new Date().toISOString()
    };
    safeSave("userProfile", p);
    const assessments = safeParse("functionalFitnessAssessments", []);
    assessments.push({date:todayKey(), scores});
    safeSave("functionalFitnessAssessments", assessments);

    const box = $("rpgResults");
    if(box){
      box.innerHTML = `<div class="resultBox"><strong>${escapeHtml(p.name)}</strong><br>Goal Weight: ${p.goalWeight} lbs<br>Avatar: ${p.bodyType}<br>Class: ${p.startingClass}</div>
      <div class="resultBox"><strong>Fitness Score</strong><br>${scores.overallFitnessScore}/100<br>${scores.classification}</div>
      <div class="resultBox"><strong>Recovery Risk</strong><br>${scores.recoveryRisk}</div>`;
    }
    renderToday();
    showProfilePreview();
    showStep(5);
  }
  function escapeHtml(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function showProfilePreview(){
    const p = profile();
    const box = $("currentProfilePreview");
    if(!box) return;
    if(!p){ box.textContent = "No profile created yet."; return; }
    box.innerHTML = `<strong>${escapeHtml(p.name || "User")}</strong><br>Goal: ${p.goalWeight || 195} lbs<br>Class: ${p.startingClass || p.fitnessClassification || "Not set"}<br>Avatar: ${p.bodyType || "Not set"}`;
  }
  function openWizard(){ $("rpgWizard")?.classList.remove("hidden"); showStep(0); }

  function initWizard(){
    $("openVisibleRpgSetup")?.addEventListener("click", openWizard);
    $("showCurrentProfile")?.addEventListener("click", showProfilePreview);
    $("closeRpgWizard")?.addEventListener("click", () => $("rpgWizard")?.classList.add("hidden"));
    document.querySelectorAll("[data-rpg-next]").forEach(b => b.addEventListener("click", () => { collectWizard(); showStep(wizard.step + 1); }));
    document.querySelectorAll("[data-rpg-prev]").forEach(b => b.addEventListener("click", () => showStep(wizard.step - 1)));
    document.querySelectorAll("[data-rpg-choice]").forEach(group => {
      group.querySelectorAll("button[data-value]").forEach(btn => {
        btn.addEventListener("click", () => {
          wizard.data[group.dataset.rpgChoice] = btn.dataset.value;
          group.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
          btn.classList.add("selected");
        });
      });
    });
    $("finishRpgWizard")?.addEventListener("click", finishWizard);
  }

  function initPain(){
    $("savePainLog")?.addEventListener("click", () => {
      const severity = num("painSeverity");
      const highRisk = $("painLocation")?.value === "Chest" || $("painDizzy")?.checked || $("painBreath")?.checked || $("painRadiating")?.checked || severity >= 8;
      const rec = highRisk ? "Stop the workout. Do not train through this. Consider medical evaluation if symptoms are current, severe, chest-related, or include dizziness, breathing trouble, numbness, or weakness." :
        severity >= 4 ? "Stop or modify this exercise. Reduce weight 10–20%, substitute the movement, and do not increase weight next session." :
        "Monitor symptoms. Continue only if pain is mild and does not change your form.";
      const logs = safeParse("painLogs", []);
      logs.push({date:todayKey(), location:$("painLocation")?.value, type:$("painType")?.value, severity, exercise:$("painExercise")?.value, recommendation:rec});
      safeSave("painLogs", logs);
      setText("painRecommendation", rec);
    });
  }

  function initSupplements(){
    $("logSupplementsToday")?.addEventListener("click", () => {
      const logs = safeParse("supplementLogs", []);
      logs.push({date:todayKey(), creatine:"5g", loggedAt:new Date().toISOString()});
      safeSave("supplementLogs", logs);
      setText("supplementStatus", "Supplements logged for today.");
    });
  }

  function initWorkout(){
    $("markWorkoutComplete")?.addEventListener("click", () => {
      const logs = safeParse("workoutLogs", []);
      logs.push({date:todayKey(), workout:workoutMap[new Date().getDay()], completed:true, completedAt:new Date().toISOString()});
      safeSave("workoutLogs", logs);
      setText("coachStatus", "Today’s workout marked complete.");
      renderToday();
    });
  }

  function initBackup(){
    $("exportJson")?.addEventListener("click", () => {
      const keys = ["userProfile","workoutLogs","progressLogs","painLogs","supplementLogs","functionalFitnessAssessments"];
      const data = {app:"Fitness Coach", version:"v38", exportedAt:new Date().toISOString(), data:{}};
      keys.forEach(k => data.data[k] = safeParse(k, null));
      const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `fitness-coach-backup-${todayKey()}.json`; a.click();
      URL.revokeObjectURL(url);
    });
    $("resetData")?.addEventListener("click", () => {
      if(!confirm("Export a backup before reset. Continue?")) return;
      ["userProfile","workoutLogs","progressLogs","painLogs","supplementLogs","functionalFitnessAssessments"].forEach(k => localStorage.removeItem(k));
      location.reload();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initWizard();
    initPain();
    initSupplements();
    initWorkout();
    initBackup();
    renderToday();
    showProfilePreview();
    setInterval(renderToday, 30000);
  });
})();
