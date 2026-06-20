
'use strict';
const VERSION='v28-audited-functional';
const KEYS=['profile','settings','workoutLogs','coachSession','coachHistory','nutritionLogs','favorites','progressLogs','activityLogs','painLogs','supplementLogs','supplementInventory','scaleLogs'];
const $=id=>document.getElementById(id); const today=()=>new Date().toISOString().slice(0,10);
const read=(k,d=[])=>{try{let v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}}; const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); const num=v=>Number.isFinite(Number(v))?Number(v):0;
const workoutPlan={
 monday:{name:'Monday - Upper Body Strength',ex:[['Dumbbell Bench Press',4,8,20,90],['One-Arm Dumbbell Row',4,8,25,75],['Standing Dumbbell Shoulder Press',3,8,15,90],['Reverse Fly',3,12,10,60],['Hammer Curl',3,10,15,60],['Overhead Triceps Extension',3,10,15,60],['Incline Treadmill Walk',1,10,0,0,'minutes']]},
 tuesday:{name:'Tuesday - Lower Body Strength',ex:[['Goblet Squat',4,8,25,90],['Dumbbell Romanian Deadlift',4,8,20,90],['Bulgarian Split Squat',3,8,0,75],['Step-Ups',3,10,0,75],['Standing Calf Raises',3,15,0,45],['Plank',3,30,0,45,'seconds']]},
 wednesday:{name:'Wednesday - Conditioning + Core',ex:[['Stationary Bike Intervals',10,1,0,90,'intervals'],['Plank',3,30,0,45,'seconds'],['Bicycle Crunches',3,15,0,30],['Leg Raises',3,10,0,45],['Mountain Climbers',3,20,0,45]]},
 thursday:{name:'Thursday - Upper Body Hypertrophy',ex:[['Incline Dumbbell Press',4,10,20,75],['One-Arm Dumbbell Row',4,10,25,75],['Arnold Press',3,10,15,75],['Lateral Raise',3,12,10,45],['Dumbbell Fly',3,10,10,60],['Dumbbell Curl',3,12,15,45],['Triceps Extension',3,12,15,45]]},
 friday:{name:'Friday - Lower Body + Conditioning',ex:[['Goblet Squat',4,10,25,75],['Romanian Deadlift',4,10,20,90],['Walking Lunges',3,10,0,75],['Sumo Squat',3,10,25,75],['Calf Raises',3,20,0,45],['Treadmill Intervals',10,1,0,60,'intervals']]}
};
const supplements=[{id:'creatine',name:'Creatine Monohydrate',dose:'5 g daily',time:'8:00 AM or post-workout',why:'Strength, muscle retention, recovery.'},{id:'protein',name:'Protein Powder',dose:'30–40 g as needed',time:'Post-workout or when protein is short',why:'Helps reach daily protein target.'},{id:'pre',name:'Pre-workout',dose:'Optional: 150–250 mg caffeine',time:'30 min before workout',why:'Energy/focus. Avoid late day if sleep suffers.'},{id:'electrolytes',name:'Electrolytes',dose:'1 serving as needed',time:'Before/during sweaty workouts',why:'Hydration support.'},{id:'fishoil',name:'Fish Oil',dose:'1–2 g EPA+DHA/day',time:'With meal',why:'General cardio/joint support.'},{id:'vitd',name:'Vitamin D3',dose:'1,000–2,000 IU if using',time:'Morning with meal',why:'Best guided by bloodwork.'}];
let restTimer=null, lockTimer=null;
function profile(){return read('profile',null)}
function targets(){let p=profile(); if(!p)return {calLow:2400,calHigh:2500,proteinLow:190,proteinHigh:210,goal:195,maintLow:193,maintHigh:197}; let kg=p.weight/2.20462, cm=((p.feet*12)+p.inches)*2.54, b=10*kg+6.25*cm-5*p.age+(p.sex==='female'?-161:p.sex==='male'?5:-78), m=Math.round(b*p.activity), c=Math.max(1200,Math.round((m-400)/50)*50); return {maintenance:m,calLow:c-100,calHigh:c+100,proteinLow:Math.round(Math.min(p.weight,p.goal)*.8),proteinHigh:Math.round(Math.min(p.weight,p.goal)),goal:p.goal,maintLow:p.goal-2,maintHigh:p.goal+2}}
function tab(id){document.querySelectorAll('.tab,nav button').forEach(e=>e.classList.remove('active')); $(id)?.classList.add('active'); document.querySelector(`[data-tab="${id}"]`)?.classList.add('active'); render();}
function init(){document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>tab(b.dataset.tab)); ['progDate','actDate','painDate','scaleDate'].forEach(id=>{$(id).value=today()}); bind(); populateWorkouts(); if(!profile()&&!localStorage.getItem('profileSkipped'))showProfile(); registerSW(); updateOnline(); window.addEventListener('online',updateOnline); window.addEventListener('offline',updateOnline); resetAutoLock(); ['click','keydown','touchstart'].forEach(e=>document.addEventListener(e,resetAutoLock,{passive:true})); render();}
function bind(){ $('startWorkout').onclick=startSession; $('resumeWorkout').onclick=renderCoach; $('nextEx').onclick=()=>moveEx(1); $('prevEx').onclick=()=>moveEx(-1); $('finishWorkout').onclick=finishSession; $('skipRest').onclick=skipRest; $('addFood').onclick=addFood; $('saveFav').onclick=saveFav; $('saveProgress').onclick=saveProgress; $('saveActivity').onclick=saveActivity; $('savePain').onclick=savePain; $('saveSupps').onclick=saveSupps; $('enableSuppNotifs').onclick=enableSuppNotifs; $('saveInventory').onclick=saveInventory; $('saveScale').onclick=saveScale; $('exportJson').onclick=exportJson; $('importJson').onchange=importJson; $('resetData').onclick=resetData; $('editProfile').onclick=showProfile; $('saveProfile').onclick=saveProfile; $('skipProfile').onclick=()=>{$('onboarding').classList.add('hidden');localStorage.setItem('profileSkipped','1')}; $('voiceEnabled').onchange=saveSettings; $('motivation').onchange=saveSettings; $('testVoice').onclick=()=>speak('Voice coach is ready. Let’s stay consistent.'); $('hideSensitive').onchange=saveSettings; $('savePin').onclick=savePin; $('lockBtn').onclick=lock; $('unlockBtn').onclick=unlock; $('cacheOffline').onclick=cacheOffline;}
function render(){applySettings(); renderHeader(); renderToday(); renderCoach(); renderFood(); renderProgress(); renderActivity(); renderPain(); renderSupplements(); renderWearables(); renderBackupProfile();}
function renderHeader(){let p=profile(),t=targets(); $('title').textContent=p?`${p.name}'s Fitness Coach`:'Fitness Coach'; $('phase').innerHTML=p?`Goal: <span data-sensitive>${p.weight} → ${p.goal} lb</span> • Calories <span data-sensitive>${t.calLow}-${t.calHigh}</span> • Protein <span data-sensitive>${t.proteinLow}-${t.proteinHigh}g</span>`:'Complete first-time setup.'}
function metric(title,big,small,level='',sens=false){return `<div class="metric ${level}" ${sens?'data-sensitive':''}><span>${esc(title)}</span><strong>${esc(big)}</strong><small>${esc(small)}</small></div>`}
function renderToday(){let t=targets(), f=todayFood(), p=latestProgress(), a=todayActivity(), s=activeSession(), wk=todayWorkout(); $('todayMetrics').innerHTML=[metric('Workout',s?'Session active':wk.name,s?`${completedSets(s)}/${totalSets(s)} sets`:'Scheduled today'),metric('Calories',`${f.calories}/${t.calHigh}`,'today',f.calories>t.calHigh?'warn':'',true),metric('Protein',`${f.protein}g/${t.proteinLow}g`,'minimum',f.protein>=t.proteinLow?'good':'warn',true),metric('Weight',p?`${p.weight} lb`:'No log',`goal ${t.goal}`, '', true),metric('Steps',a?`${a.steps}`:'No log','goal 8,000',a&&a.steps>=8000?'good':'')].join('')}
function todayWorkout(){let d=new Date().getDay(), keys=['monday','monday','tuesday','wednesday','thursday','friday','monday']; return workoutPlan[keys[d]]}
function populateWorkouts(){let sel=$('workoutSelect'); sel.innerHTML=Object.entries(workoutPlan).map(([k,w])=>`<option value="${k}">${w.name}</option>`).join(''); let d=new Date().getDay(), keys=['monday','monday','tuesday','wednesday','thursday','friday','monday']; sel.value=keys[d]}
function buildSession(key){let w=workoutPlan[key]; return {id:Date.now(),date:today(),name:w.name,startedAt:new Date().toISOString(),idx:0,ex:w.ex.map(x=>({name:x[0],sets:x[1],targetReps:x[2],weight:x[3],rest:x[4],unit:x[5]||'reps',completed:false,skipped:false,pain:false,notes:'',skipReason:'',setsData:Array.from({length:x[1]},(_,i)=>({set:i+1,target:x[2],weight:x[3]||'',reps:'',completed:false}))}))}}
function activeSession(){return read('coachSession',null)} function saveSession(s){write('coachSession',s)} function startSession(){let existing=activeSession(); if(existing&&!confirm('Replace current active session?'))return; let s=buildSession($('workoutSelect').value); saveSession(s); speak(`Starting ${s.name}. Let's get to work.`); render()}
function totalSets(s){return s.ex.reduce((a,e)=>a+e.setsData.length,0)} function completedSets(s){return s.ex.reduce((a,e)=>a+e.setsData.filter(x=>x.completed).length,0)}
function renderCoach(){let s=activeSession(), card=$('exerciseCard'); if(!s){$('sessionStatus').textContent='No active session.'; $('sessionBar').style.width='0%'; card.innerHTML=''; return} let pct=Math.round(completedSets(s)/Math.max(1,totalSets(s))*100); $('sessionStatus').textContent=`${s.name} • ${completedSets(s)}/${totalSets(s)} sets • ${pct}%`; $('sessionBar').style.width=pct+'%'; let e=s.ex[s.idx]; card.innerHTML=`<div class="card"><h3>${esc(e.name)}</h3><p>Target: ${e.sets} × ${e.targetReps} ${e.unit}${e.weight?' @ '+e.weight+' lb':''}</p>${e.setsData.map((sd,i)=>`<div class="setRow ${sd.completed?'completed':''}"><strong>Set ${sd.set}</strong><label>Weight<input data-w="${i}" type="number" step="0.5" value="${esc(sd.weight)}"></label><label>${e.unit}<input data-r="${i}" type="number" value="${esc(sd.reps)}" placeholder="${sd.target}"></label><button onclick="toggleSet(${i})">${sd.completed?'Undo':'Done'}</button></div>`).join('')}<label><input id="exPain" type="checkbox" ${e.pain?'checked':''}> Pain/discomfort</label><label>Notes<textarea id="exNotes">${esc(e.notes)}</textarea></label><label>Skip reason<input id="skipReason" value="${esc(e.skipReason)}"></label><button onclick="skipExercise()" class="ghost">${e.skipped?'Unskip':'Skip'} Exercise</button><button onclick="completeExercise()">${e.completed?'Mark Incomplete':'Mark Exercise Complete'}</button></div>`; card.querySelectorAll('input[data-w],input[data-r]').forEach(inp=>inp.onchange=storeSetInputs); $('exPain').onchange=()=>{let ss=activeSession();ss.ex[ss.idx].pain=$('exPain').checked;saveSession(ss); if($('exPain').checked){speak('Pain detected. Stop and assess. Pain is not the goal.');}}; $('exNotes').onchange=()=>{let ss=activeSession();ss.ex[ss.idx].notes=$('exNotes').value;saveSession(ss)}; $('skipReason').onchange=()=>{let ss=activeSession();ss.ex[ss.idx].skipReason=$('skipReason').value;saveSession(ss)}; renderProgression();}
function storeSetInputs(){let s=activeSession(), e=s.ex[s.idx]; document.querySelectorAll('[data-w]').forEach(i=>e.setsData[num(i.dataset.w)].weight=i.value); document.querySelectorAll('[data-r]').forEach(i=>e.setsData[num(i.dataset.r)].reps=i.value); saveSession(s)}
window.toggleSet=i=>{let s=activeSession(), e=s.ex[s.idx]; storeSetInputs(); s=activeSession(); e=s.ex[s.idx]; let sd=e.setsData[i]; sd.completed=!sd.completed; if(sd.completed&&!sd.reps)sd.reps=sd.target; e.completed=e.setsData.every(x=>x.completed); saveSession(s); render(); if(sd.completed){speak(coachPhrase('set')); startRest(e.rest||num($('restDefault').value)||60)}}
function startRest(sec){clearInterval(restTimer); let left=sec; $('restBox').classList.remove('hidden'); const draw=()=>{$('restText').textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`}; draw(); restTimer=setInterval(()=>{left--; if([60,30,10].includes(left))speak(`${left} seconds remaining.`); draw(); if(left<=0){skipRest(); speak('Rest complete. Prepare for your next set.'); if(navigator.vibrate)navigator.vibrate([150,80,150]);}},1000)}
function skipRest(){clearInterval(restTimer); $('restBox').classList.add('hidden')} function moveEx(d){let s=activeSession(); if(!s)return; s.idx=Math.max(0,Math.min(s.ex.length-1,s.idx+d)); saveSession(s); render()} window.skipExercise=()=>{let s=activeSession(), e=s.ex[s.idx]; e.skipped=!e.skipped; e.skipReason=$('skipReason').value; saveSession(s); render()} ; window.completeExercise=()=>{let s=activeSession(), e=s.ex[s.idx]; storeSetInputs(); s=activeSession(); e=s.ex[s.idx]; e.completed=!e.completed; if(e.completed)e.setsData.forEach(x=>{x.completed=true;if(!x.reps)x.reps=x.target}); saveSession(s); render()}
function finishSession(){let s=activeSession(); if(!s)return; s.finishedAt=new Date().toISOString(); s.duration=Math.round((new Date(s.finishedAt)-new Date(s.startedAt))/60000); let hist=read('coachHistory'); hist.unshift(s); write('coachHistory',hist); let logs=read('workoutLogs'); logs.unshift({date:s.date,workout:s.name,duration:s.duration,completedSets:completedSets(s),totalSets:totalSets(s),exercises:s.ex}); write('workoutLogs',logs); localStorage.removeItem('coachSession'); $('sessionSummary').innerHTML=`<div class="metric good"><strong>Workout complete</strong><small>${completedSets(s)}/${totalSets(s)} sets in ${s.duration} min</small></div>`; speak('Workout complete. Excellent work today. Recovery and nutrition are next.'); render()}
function renderProgression(){let box=$('progressionBox'), hist=read('coachHistory'), rec=[]; let names={}; hist.forEach(sess=>sess.ex.forEach(e=>{(names[e.name]||(names[e.name]=[])).push(e)})); Object.entries(names).forEach(([n,arr])=>{let last=arr.slice(0,2); if(last.length<2)return; let good=last.every(e=>e.completed&&!e.pain&&!e.skipped&&e.setsData.every(s=>s.completed&&num(s.reps)>=num(s.target))); if(good){let w=num(last[0].setsData[0].weight); if(w)rec.push(`<div class="metric good"><strong>${esc(n)}</strong><small>All targets hit twice. Try ${w+(n.toLowerCase().match(/squat|deadlift|lunge/)?10:5)} lb next time.</small></div>`)} }); box.innerHTML=rec.join('')||'<p class="muted">No increases yet. Hit all reps twice with no pain flags.</p>'}
function coachPhrase(type){let s=read('settings',{}); let high=s.motivation==='High'; return type==='set'?(high?'Great set. Stay locked in.':'Great work. Get ready for the next set.'):'You have got this.'} function speak(text){let s=read('settings',{}); if(!s.voice||!('speechSynthesis'in window))return; speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text));}
function addFood(){let f={date:today(),meal:$('meal').value,name:$('foodName').value.trim()||'Food',calories:num($('foodCal').value),protein:num($('foodProtein').value),carbs:num($('foodCarbs').value),fat:num($('foodFat').value)}; if(f.calories<0||f.protein<0)return alert('Invalid negative values.'); let logs=read('nutritionLogs'); logs.unshift(f); write('nutritionLogs',logs); ['foodName','foodCal','foodProtein','foodCarbs','foodFat'].forEach(id=>$(id).value=''); render()}
function saveFav(){let f={meal:$('meal').value,name:$('foodName').value.trim(),calories:num($('foodCal').value),protein:num($('foodProtein').value),carbs:num($('foodCarbs').value),fat:num($('foodFat').value)}; if(!f.name)return alert('Enter food name.'); let fav=read('favorites'); fav.unshift(f); write('favorites',fav.slice(0,30)); render()}
function renderFood(){let logs=read('nutritionLogs').filter(f=>f.date===today()); $('foodLog').innerHTML=logs.map(f=>`<p data-sensitive><strong>${esc(f.name)}</strong> — ${f.calories} cal, ${f.protein}g protein</p>`).join('')||'<p class="muted">No food logged today.</p>'; let fav=read('favorites'); $('favorites').innerHTML=fav.map((f,i)=>`<div class="metric"><strong>${esc(f.name)}</strong><small>${f.calories} cal • ${f.protein}g</small><button onclick="repeatFav(${i})">Add</button></div>`).join('')||'<p class="muted">No favorites.</p>'} window.repeatFav=i=>{let f=read('favorites')[i]; if(f){let l=read('nutritionLogs'); l.unshift({...f,date:today()}); write('nutritionLogs',l); render()}}
function todayFood(){return read('nutritionLogs').filter(f=>f.date===today()).reduce((a,f)=>({calories:a.calories+num(f.calories),protein:a.protein+num(f.protein)}),{calories:0,protein:0})}
function saveProgress(){let w=num($('progWeight').value); if(w<=0)return alert('Enter weight.'); let l=read('progressLogs'); l.unshift({date:$('progDate').value||today(),weight:w,waist:num($('progWaist').value),notes:$('progNotes').value}); write('progressLogs',l); render();}
function latestProgress(){return read('progressLogs').sort((a,b)=>b.date.localeCompare(a.date))[0]} function renderProgress(){let rows=read('progressLogs').slice().sort((a,b)=>a.date.localeCompare(b.date)); draw('weightChart',[{label:'Weight',pts:rows.map(r=>[r.date,num(r.weight)])}],targets().goal)}
function saveActivity(){let l=read('activityLogs'); l.unshift({date:$('actDate').value||today(),steps:num($('steps').value),active:num($('activeMin').value),cardio:num($('cardioMin').value),sleep:num($('sleep').value),rhr:num($('rhr').value),source:'manual'}); write('activityLogs',l); render()}
function todayActivity(){return read('activityLogs').find(a=>a.date===today())} function renderActivity(){let a=todayActivity(), msgs=[]; if(!a)msgs.push(metric('Start tracking','No activity logged','Add steps/sleep/RHR','warn')); else {msgs.push(metric('Steps',a.steps,'goal 8,000',a.steps>=8000?'good':'warn')); msgs.push(metric('Sleep',a.sleep+' h','goal 7+',a.sleep>=7?'good':'warn')); if(a.sleep&&a.sleep<6)msgs.push(metric('Recovery','Low sleep','Consider reducing intensity','warn')); if(a.rhr)msgs.push(metric('Resting HR',a.rhr,'watch elevated trends'))} $('recoveryBox').innerHTML=msgs.join('')}
function savePain(){let p={date:$('painDate').value||today(),exercise:$('painExercise').value,location:$('painLocation').value,side:$('painSide').value,type:$('painType').value,severity:num($('painSeverity').value),timing:$('painTiming').value,symptoms:$('painSymptoms').value,action:$('painAction').value}; p.recommendation=painRec(p); let l=read('painLogs'); l.unshift(p); write('painLogs',l); speak(p.recommendation.voice); render()}
function painRec(p){let high=/(chest|pressure|dizziness|shortness|breath|faint|numb|radiating|weakness)/i.test([p.location,p.type,p.symptoms].join(' ')); if(high||p.severity>=8)return {level:'bad',text:'Stop the workout. Do not push through this. Consider urgent medical evaluation, especially with chest pressure, dizziness, breathing trouble, weakness, numbness, or radiating pain.',voice:'Pain warning. Stop the workout and assess. Pain is not the goal.'}; if(p.type==='Sharp'||p.severity>=4)return {level:'warn',text:'Modify: stop this exercise, reduce weight 10–20%, use a substitute, and block weight increases for this movement.',voice:'Pain detected. Reduce weight or substitute the exercise.'}; return {level:'good',text:'Monitor: mild soreness/fatigue may be normal. Keep form strict and reassess next set.',voice:'Monitor this. Keep form controlled.'}}
function renderPain(){let l=read('painLogs'); let last=l[0]; $('painRecommendation').innerHTML=last?`<div class="metric ${last.recommendation.level}"><strong>${esc(last.location)} pain: ${esc(last.type)} ${last.severity}/10</strong><small>${esc(last.recommendation.text)}</small></div>`:'<p class="muted">No pain logged.</p>'; $('painHistory').innerHTML=l.slice(0,10).map(p=>`<p><strong>${esc(p.date)} ${esc(p.location)}</strong> ${p.severity}/10 — ${esc(p.recommendation.text)}</p>`).join('')}
function renderSupplements(){let t=targets(), log=read('supplementLogs').find(x=>x.date===today())||{}; $('suppPlan').innerHTML=supplements.map(s=>`<div class="metric"><strong>${s.name}</strong><small>${s.dose}<br>${s.time}<br>${s.why}</small></div>`).join(''); $('suppChecks').innerHTML=supplements.map(s=>`<label class="metric"><input type="checkbox" data-supp="${s.id}" ${log[s.id]?'checked':''}> <strong>${s.name}</strong><small>${s.dose}</small></label>`).join('')+`<div class="metric"><strong>Protein Goal</strong><small>${t.proteinLow}-${t.proteinHigh}g/day</small></div>`; let inv=read('supplementInventory',{}); ['Creatine','Protein','Pre','Fish','D'].forEach(k=>{let el=$('inv'+k); if(el&&!el.value)el.value=inv[k.toLowerCase()]||''})}
function saveSupps(){let entry={date:today()}; document.querySelectorAll('[data-supp]').forEach(c=>entry[c.dataset.supp]=c.checked); let logs=read('supplementLogs').filter(x=>x.date!==today()); logs.unshift(entry); write('supplementLogs',logs); speak('Supplements logged. Consistency supports your training.'); render()} function saveInventory(){let inv={creatine:num($('invCreatine').value),protein:num($('invProtein').value),pre:num($('invPre').value),fish:num($('invFish').value),d:num($('invD').value)}; write('supplementInventory',inv); alert('Inventory saved.')} async function enableSuppNotifs(){if(!('Notification'in window))return alert('Notifications not supported. Use the included supplement-reminders.ics file.'); let p=await Notification.requestPermission(); if(p==='granted')new Notification('Supplement reminders enabled',{body:'Use Calendar file for most reliable iPhone reminders.'})}
function saveScale(){let w=num($('scaleWeight').value); if(w<=0)return alert('Enter weight.'); let entry={date:$('scaleDate').value||today(),source:$('scaleSource').value,weight:w,bodyFat:num($('scaleFat').value),muscle:num($('scaleMuscle').value)}; let s=read('scaleLogs'); s.unshift(entry); write('scaleLogs',s); let p=read('progressLogs'); p.unshift({date:entry.date,weight:w,waist:'',notes:`${entry.source}; body fat ${entry.bodyFat||'-'}%; muscle ${entry.muscle||'-'}`}); write('progressLogs',p); render()} function renderWearables(){}
function showProfile(){let p=profile()||{name:'',age:48,sex:'male',feet:6,inches:2,weight:215,goal:195,activity:1.55}; $('pName').value=p.name; $('pAge').value=p.age; $('pSex').value=p.sex; $('pFeet').value=p.feet; $('pInches').value=p.inches; $('pWeight').value=p.weight; $('pGoal').value=p.goal; $('pActivity').value=p.activity; $('onboarding').classList.remove('hidden')} function saveProfile(){let p={name:$('pName').value.trim()||'User',age:num($('pAge').value),sex:$('pSex').value,feet:num($('pFeet').value),inches:num($('pInches').value),weight:num($('pWeight').value),goal:num($('pGoal').value),activity:num($('pActivity').value)}; if(!p.age||!p.weight||!p.goal)return $('profileErr').textContent='Enter age, weight and goal.'; write('profile',p); $('onboarding').classList.add('hidden'); render()} function renderBackupProfile(){let p=profile(); $('profileSummary').innerHTML=p?`<table><tr><td>Name</td><td>${esc(p.name)}</td></tr><tr><td>Age</td><td>${p.age}</td></tr><tr><td>Weight goal</td><td data-sensitive>${p.weight} → ${p.goal}</td></tr></table>`:'No profile.'}
function settings(){return read('settings',{})} function saveSettings(){let s=settings(); s.voice=$('voiceEnabled').checked; s.motivation=$('motivation').value; s.hideSensitive=$('hideSensitive').checked; write('settings',s); applySettings()} function applySettings(){let s=settings(); document.body.classList.toggle('hideSensitive',!!s.hideSensitive); if($('voiceEnabled'))$('voiceEnabled').checked=!!s.voice; if($('motivation'))$('motivation').value=s.motivation||'Moderate'; if($('hideSensitive'))$('hideSensitive').checked=!!s.hideSensitive; $('onlineStatus')&&($('onlineStatus').textContent=navigator.onLine?'Online':'Offline')}
async function hash(v){if(crypto.subtle){let b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}return btoa(v)} async function savePin(){let pin=$('pinSet').value; if(pin.length<4)return alert('Use at least 4 characters.'); let s=settings(); s.pin=await hash(pin); write('settings',s); $('pinSet').value=''; alert('PIN saved.')} function lock(){if(settings().pin)$('lockScreen').classList.remove('hidden')} async function unlock(){let s=settings(); if(await hash($('unlockPin').value)===s.pin){$('unlockErr').textContent='';$('lockScreen').classList.add('hidden')}else $('unlockErr').textContent='Wrong PIN'} function resetAutoLock(){clearTimeout(lockTimer); let s=settings(); if(s.pin&&s.autoLock)lockTimer=setTimeout(lock,s.autoLock*60000)}
function backup(){let data={app:'Fitness Coach',version:VERSION,exportedAt:new Date().toISOString(),data:{}}; KEYS.forEach(k=>data.data[k]=read(k,k==='profile'?null:[])); return data} function download(n,t,type='text/plain'){let b=new Blob([t],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=n;a.click();URL.revokeObjectURL(u)} function exportJson(){download(`fitness-backup-${today()}.json`,JSON.stringify(backup(),null,2),'application/json')} function importJson(e){let f=e.target.files[0]; if(!f)return; let r=new FileReader(); r.onload=()=>{try{let b=JSON.parse(r.result); if(!b.data)throw Error(); if(confirm('Replace local app data with this backup?')){Object.entries(b.data).forEach(([k,v])=>write(k,v)); location.reload()}}catch{alert('Invalid backup.')}}; r.readAsText(f)} function resetData(){if(confirm('Export a backup first. Reset local data?')&&confirm('Final confirmation. This cannot be undone.')){KEYS.forEach(k=>localStorage.removeItem(k));location.reload()}}
function exportCsv(key){let rows=read(key); if(!rows.length)return alert('No data.'); let heads=[...new Set(rows.flatMap(r=>Object.keys(r)))]; let csv=[heads.join(','),...rows.map(r=>heads.map(h=>`"${String(typeof r[h]==='object'?JSON.stringify(r[h]):r[h]??'').replace(/"/g,'""')}"`).join(','))].join('\n'); download(`${key}.csv`,csv,'text/csv')} async function cacheOffline(){if(!('caches'in window))return alert('Caching unavailable.'); let c=await caches.open('fitness-v28'); await c.addAll(['./','index.html','app.js','styles.css','manifest.json','service-worker.js','icon.svg','supplement-reminders.ics']); alert('Saved for offline use.')} function updateOnline(){if($('onlineStatus'))$('onlineStatus').textContent=navigator.onLine?'Online':'Offline'} async function registerSW(){if('serviceWorker'in navigator)try{await navigator.serviceWorker.register('service-worker.js')}catch(e){console.warn(e)}}
function draw(id,series,goal){let c=$(id); if(!c)return; let ctx=c.getContext('2d'),W=c.width,H=c.height,pad=42; ctx.clearRect(0,0,W,H); ctx.font='12px system-ui'; let pts=series.flatMap(s=>s.pts).filter(p=>Number.isFinite(p[1])); if(!pts.length){ctx.fillText('No data yet.',pad,H/2);return} let xs=[...new Set(pts.map(p=>p[0]))].sort(), vals=pts.map(p=>p[1]); if(goal)vals.push(goal); let min=Math.min(...vals),max=Math.max(...vals); if(min===max){min--;max++} let xf=x=>pad+(xs.indexOf(x)/Math.max(1,xs.length-1))*(W-pad*1.5), yf=y=>H-pad-((y-min)/(max-min))*(H-pad*1.5); ctx.globalAlpha=.35; ctx.beginPath(); ctx.moveTo(pad,20);ctx.lineTo(pad,H-pad);ctx.lineTo(W-20,H-pad);ctx.stroke();ctx.globalAlpha=1; series.forEach(s=>{let p=s.pts;ctx.beginPath();p.forEach((pt,i)=>{let x=xf(pt[0]),y=yf(pt[1]);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();ctx.fillText(s.label,W-150,24)}); if(goal){let y=yf(goal);ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(W-20,y);ctx.stroke();ctx.setLineDash([]);ctx.fillText('Goal '+goal,W-90,y-6)}}
init();


/* v29 Date / Day / Time Fix */
const weekdayWorkoutMap = {
  0: { key: 'rest', name: 'Sunday - Recovery / Rest Day' },
  1: { key: 'monday', name: 'Monday - Upper Body Strength' },
  2: { key: 'tuesday', name: 'Tuesday - Lower Body Strength' },
  3: { key: 'wednesday', name: 'Wednesday - Conditioning + Core' },
  4: { key: 'thursday', name: 'Thursday - Upper Body Muscle Building' },
  5: { key: 'friday', name: 'Friday - Lower Body + Conditioning' },
  6: { key: 'rest', name: 'Saturday - Recovery / Rest Day' }
};

function appNow(){ return new Date(); }

function appDateKey(d = appNow()){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function appDayName(d = appNow()){
  return d.toLocaleDateString(undefined, { weekday:'long' });
}

function appDateText(d = appNow()){
  return d.toLocaleDateString(undefined, { month:'long', day:'numeric', year:'numeric' });
}

function appTimeText(d = appNow()){
  return d.toLocaleTimeString(undefined, { hour:'numeric', minute:'2-digit' });
}

function workoutForDate(d = appNow()){
  return weekdayWorkoutMap[d.getDay()] || weekdayWorkoutMap[1];
}

function isWorkoutCompletedForDate(dateKey){
  let logs = [];
  try { logs = JSON.parse(localStorage.getItem('workoutLogs') || '[]'); } catch(e) {}
  if(!Array.isArray(logs)) logs = [];
  return logs.some(l => (l.date || '').slice(0,10) === dateKey && (l.completed === true || l.completed === 'true'));
}

function latestMissedWorkout(){
  const today = appNow();
  for(let i=1;i<=5;i++){
    const d = new Date(today);
    d.setDate(today.getDate()-i);
    const plan = workoutForDate(d);
    if(plan.key !== 'rest' && !isWorkoutCompletedForDate(appDateKey(d))){
      return {date: appDateKey(d), plan};
    }
  }
  return null;
}

function timeOfDayAction(now = appNow(), plan = workoutForDate(now), complete = false){
  const hour = now.getHours();
  if(plan.key === 'rest'){
    if(hour < 12) return 'Recovery day: hydrate, walk, and check supplements.';
    if(hour < 18) return 'Optional walk, stretching, or easy bike.';
    return 'Prepare for the next workout day.';
  }
  if(complete){
    if(hour < 18) return 'Workout complete. Stay on protein, hydration, and steps.';
    return 'Review protein, recovery, and tomorrow’s plan.';
  }
  if(hour < 10) return 'Morning check-in: weight, water, creatine, and today’s plan.';
  if(hour < 15) return 'Workout later today. Keep protein and hydration on track.';
  if(hour < 18) return 'Workout window is open. Start today’s session when ready.';
  return 'If you have not trained yet, complete the workout or mark it missed.';
}

function renderTodayDashboard(){
  const now = appNow();
  const plan = workoutForDate(now);
  const dateKey = appDateKey(now);
  const complete = isWorkoutCompletedForDate(dateKey);
  const missed = latestMissedWorkout();

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if(el) el.textContent = text;
  };

  setText('todayDayName', appDayName(now));
  setText('todayDateText', appDateText(now));
  setText('todayTimeText', appTimeText(now));
  setText('todayWorkoutText', plan.name);
  setText('todayWorkoutStatus', plan.key === 'rest' ? 'Rest / recovery day' : (complete ? '✓ Completed' : 'Not started'));

  let next = timeOfDayAction(now, plan, complete);
  if(missed && plan.key !== 'rest' && !complete){
    next = `Missed workout detected: ${missed.plan.name} from ${missed.date}. Choose whether to do missed workout or continue with today.`;
  }
  setText('todayNextAction', next);

  const sel = document.getElementById('coachWorkoutSelect');
  if(sel && plan.key !== 'rest' && sel.querySelector(`option[value="${plan.key}"]`)){
    const activeSession = localStorage.getItem('activeCoachSession');
    if(!activeSession) sel.value = plan.key;
  }
}

function initDateTimeAwareness(){
  renderTodayDashboard();
  setInterval(renderTodayDashboard, 30000);
}

try {
  if(typeof coachTodayWorkoutKey === 'function'){
    coachTodayWorkoutKey = function(){
      const plan = workoutForDate(appNow());
      return plan.key === 'rest' ? 'monday' : plan.key;
    };
  }
} catch(e) {}


initDateTimeAwareness();
initDynamicGoalHeader();


/* v31 Dynamic Goal Weight Header */
function getDynamicUserProfile(){
  try{
    const p = JSON.parse(localStorage.getItem('userProfile') || 'null');
    return p && typeof p === 'object' ? p : null;
  }catch(e){
    return null;
  }
}

function getLatestLoggedWeight(){
  let logs = [];
  try{ logs = JSON.parse(localStorage.getItem('progressLogs') || '[]'); }catch(e){}
  if(!Array.isArray(logs)) return null;
  const rows = logs
    .map(l => ({
      date: (l.date || '').slice(0,10),
      weight: Number(l.bodyWeight ?? l.weight)
    }))
    .filter(l => Number.isFinite(l.weight))
    .sort((a,b) => a.date.localeCompare(b.date));
  return rows.length ? rows[rows.length - 1].weight : null;
}

function getGoalWeight(){
  const p = getDynamicUserProfile();
  const goal = Number(p?.goalWeight ?? p?.goal_weight ?? p?.targetWeight);
  return Number.isFinite(goal) && goal > 0 ? goal : 195;
}

function renderDynamicGoalHeader(){
  const profile = getDynamicUserProfile();
  const goal = getGoalWeight();
  const latest = getLatestLoggedWeight();
  const appTitle = document.getElementById('appTitle');
  const goalHeader = document.getElementById('goalWeightHeader');
  const progressHeader = document.getElementById('goalProgressHeader');

  if(appTitle){
    appTitle.textContent = 'Fitness Coach';
  }

  if(goalHeader){
    goalHeader.textContent = `Goal Weight: ${goal} lbs`;
  }

  if(progressHeader){
    if(latest){
      const remaining = Math.round((latest - goal) * 10) / 10;
      if(Math.abs(remaining) <= 2){
        progressHeader.textContent = `Current: ${latest} lbs • Goal reached/maintenance range`;
      } else if(remaining > 0){
        progressHeader.textContent = `Current: ${latest} lbs • ${remaining} lbs to goal`;
      } else {
        progressHeader.textContent = `Current: ${latest} lbs • ${Math.abs(remaining)} lbs below goal`;
      }
    } else if(profile?.weight){
      const remaining = Math.round((Number(profile.weight) - goal) * 10) / 10;
      progressHeader.textContent = `Starting: ${profile.weight} lbs • ${remaining > 0 ? remaining + ' lbs to goal' : 'goal set'}`;
    } else {
      progressHeader.textContent = 'Complete profile setup to personalize your goal.';
    }
  }

  document.title = `Fitness Coach - Goal ${goal}`;
}

function initDynamicGoalHeader(){
  renderDynamicGoalHeader();
  setInterval(renderDynamicGoalHeader, 60000);
}



/* v34 Audited Functional Layer */
(function(){
  "use strict";

  const $ = (id) => document.getElementById(id);
  const safeParse = (key, fallback) => {
    try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fallback; }
    catch(e){ return fallback; }
  };
  const safeSave = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const workoutMap = {
    0:{key:"rest",name:"Sunday - Recovery / Rest Day"},
    1:{key:"monday",name:"Monday - Upper Body Strength"},
    2:{key:"tuesday",name:"Tuesday - Lower Body Strength"},
    3:{key:"wednesday",name:"Wednesday - Conditioning + Core"},
    4:{key:"thursday",name:"Thursday - Upper Body Muscle Building"},
    5:{key:"friday",name:"Friday - Lower Body + Conditioning"},
    6:{key:"rest",name:"Saturday - Recovery / Rest Day"}
  };

  function todayKey(d=new Date()){
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }
  function profile(){
    return safeParse("userProfile", {});
  }
  function goalWeight(){
    const p = profile();
    const g = Number(p.goalWeight ?? p.goal_weight ?? p.targetWeight);
    return Number.isFinite(g) && g > 0 ? g : 195;
  }
  function latestWeight(){
    const logs = safeParse("progressLogs", []);
    if(!Array.isArray(logs)) return null;
    const rows = logs.map(l => ({date:(l.date||"").slice(0,10), weight:Number(l.bodyWeight ?? l.weight)}))
      .filter(r => Number.isFinite(r.weight))
      .sort((a,b)=>a.date.localeCompare(b.date));
    return rows.length ? rows[rows.length-1].weight : null;
  }
  function completedToday(){
    const key = todayKey();
    const logs = safeParse("workoutLogs", []);
    return Array.isArray(logs) && logs.some(l => (l.date||"").slice(0,10) === key && (l.completed === true || l.completed === "true"));
  }
  function setText(id, text){ const el=$(id); if(el) el.textContent = text; }

  function renderToday(){
    const now = new Date();
    const plan = workoutMap[now.getDay()] || workoutMap[1];
    const goal = goalWeight();
    const current = latestWeight() ?? Number(profile().weight || 0);
    const complete = completedToday();

    setText("appTitle","Fitness Coach");
    document.title = `Fitness Coach - Goal ${goal}`;
    setText("goalWeightHeader",`Goal Weight: ${goal} lbs`);
    if(current){
      const remaining = Math.round((current - goal)*10)/10;
      setText("goalProgressHeader", Math.abs(remaining)<=2 ? `Current: ${current} lbs • Goal/maintenance range` : remaining>0 ? `Current: ${current} lbs • ${remaining} lbs to goal` : `Current: ${current} lbs • ${Math.abs(remaining)} lbs below goal`);
    } else {
      setText("goalProgressHeader","Complete profile setup to personalize your goal.");
    }

    setText("todayDayName", now.toLocaleDateString(undefined,{weekday:"long"}));
    setText("todayDateText", now.toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"}));
    setText("todayTimeText", now.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}));
    setText("todayWorkoutText", plan.name);
    setText("todayWorkoutStatus", plan.key==="rest" ? "Rest / recovery day" : complete ? "✓ Completed" : "Not started");

    const hour = now.getHours();
    let action = "Stay consistent today.";
    if(plan.key==="rest") action = hour < 18 ? "Recovery day: walk, hydrate, mobility, and protein." : "Review recovery and prepare for the next workout.";
    else if(complete) action = "Workout complete. Focus on protein, hydration, and recovery.";
    else if(hour < 10) action = "Morning check-in: weight, supplements, water, and today’s plan.";
    else if(hour < 15) action = "Workout later today. Keep nutrition and hydration on track.";
    else if(hour < 18) action = "Workout window is open. Start today’s guided session when ready.";
    else action = "Complete today’s workout or mark it missed.";
    setText("todayNextAction", action);
  }

  function initTabs(){
    document.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        const section = $(target);
        if(section) section.classList.add("active");
      });
    });
  }

  function scoreFunctionalAssessment(input){
    const chair = Math.min(40, (Number(input.chairStandReps || 0) / 20) * 40);
    const push = Math.min(30, (Number(input.pushUpReps || 0) / 20) * 30);
    const plank = Math.min(30, (Number(input.plankSeconds || 0) / 90) * 30);
    const strengthScore = Math.round(chair + push + plank);
    const walk = Math.min(60, (Number(input.walkDistance || 0) / 0.5) * 60);
    const effort = Math.max(0, 20 - Math.max(0, Number(input.perceivedEffort || 5) - 5) * 4);
    const conditioningScore = Math.round(walk + effort);
    let mobilityScore = 100;
    ["shoulderPain","kneePain","backPain"].forEach(flag => { if(input[flag]) mobilityScore -= 20; });
    mobilityScore = Math.max(0, mobilityScore);
    const overallFitnessScore = Math.round(strengthScore*.4 + conditioningScore*.35 + mobilityScore*.25);
    let classification = "Beginner";
    if(overallFitnessScore >= 70 && mobilityScore >= 70) classification = "Intermediate";
    else if(overallFitnessScore >= 45) classification = "Novice";
    let recoveryRisk = "Low";
    if(mobilityScore < 70 || Number(input.perceivedEffort||0) >= 8) recoveryRisk = "Moderate";
    if(input.dizziness) recoveryRisk = "Elevated";
    return {strengthScore,conditioningScore,mobilityScore,overallFitnessScore,classification,recoveryRisk};
  }

  function initAssessments(){
    $("saveFitnessAssessment")?.addEventListener("click", () => {
      const row = {
        date: todayKey(),
        trainingExperience: $("faTraining")?.value,
        activityLevel: $("faActivity")?.value,
        gymExperience: $("faGym")?.value,
        cardioCapacity: $("faCardio")?.value,
        confidenceLevel: $("faConfidence")?.value
      };
      const rows = safeParse("fitnessAssessments", []);
      rows.push(row);
      safeSave("fitnessAssessments", rows);
      alert("Fitness assessment saved.");
    });

    $("saveFunctionalAssessment")?.addEventListener("click", () => {
      const input = {
        date: todayKey(),
        walkDistance: Number($("ffWalkDistance")?.value || 0),
        perceivedEffort: Number($("ffEffort")?.value || 0),
        chairStandReps: Number($("ffChair")?.value || 0),
        pushUpReps: Number($("ffPushups")?.value || 0),
        plankSeconds: Number($("ffPlank")?.value || 0),
        shoulderPain: $("ffShoulderPain")?.checked,
        kneePain: $("ffKneePain")?.checked,
        backPain: $("ffBackPain")?.checked,
        dizziness: $("ffDizziness")?.checked
      };
      const scores = scoreFunctionalAssessment(input);
      const rows = safeParse("functionalFitnessAssessments", []);
      rows.push({...input, scores});
      safeSave("functionalFitnessAssessments", rows);
      const box = $("functionalAssessmentResult");
      if(box) box.innerHTML = `<strong>Overall: ${scores.overallFitnessScore}/100 (${scores.classification})</strong><br>Strength: ${scores.strengthScore} • Conditioning: ${scores.conditioningScore} • Mobility: ${scores.mobilityScore}<br>Recovery Risk: ${scores.recoveryRisk}`;
    });
  }

  function initPain(){
    $("savePainLog")?.addEventListener("click", () => {
      const severity = Number($("painSeverity")?.value || 0);
      const highRisk = $("painLocation")?.value === "Chest" || $("painDizzy")?.checked || $("painBreath")?.checked || $("painRadiating")?.checked || severity >= 8;
      let recommendation = "Monitor symptoms, use good form, and continue only if pain stays mild.";
      if(highRisk) recommendation = "Stop the workout. Do not train through this. Consider urgent medical evaluation if symptoms are severe, chest-related, or include dizziness, breathing trouble, numbness, or weakness.";
      else if(severity >= 4 || ["Sharp","Tingling","Numbness","Pressure"].includes($("painType")?.value)) recommendation = "Stop or modify this exercise. Reduce weight 10–20%, use a substitute, and do not increase weight next session.";
      const row = {
        date: todayKey(),
        location: $("painLocation")?.value,
        side: $("painSide")?.value,
        type: $("painType")?.value,
        severity,
        exercise: $("painExercise")?.value,
        timing: $("painTiming")?.value,
        dizziness: $("painDizzy")?.checked,
        shortnessOfBreath: $("painBreath")?.checked,
        radiatingPain: $("painRadiating")?.checked,
        recommendation
      };
      const rows = safeParse("painLogs", []);
      rows.push(row);
      safeSave("painLogs", rows);
      const box = $("painRecommendation");
      if(box) box.textContent = recommendation;
      if(window.AdaptiveVoiceCoach?.speak) window.AdaptiveVoiceCoach.speak(highRisk ? "Stop the workout and assess symptoms." : "Pain logged. Consider reducing weight and focusing on technique.");
    });
  }

  function initSupplements(){
    $("logSupplementsToday")?.addEventListener("click", () => {
      const rows = safeParse("supplementLogs", []);
      rows.push({date: todayKey(), creatine:"5g", protein:"as needed", vitaminD:"if taking", fishOil:"if taking", loggedAt:new Date().toISOString()});
      safeSave("supplementLogs", rows);
      setText("supplementStatus","Supplements logged for today. Creatine target: 5g daily. Protein target depends on your profile and daily intake.");
    });
  }

  function exportBackup(){
    const keys = ["userProfile","workoutLogs","nutritionLogs","progressLogs","activityLogs","painLogs","supplementLogs","fitnessAssessments","functionalFitnessAssessments","coachSessionHistory"];
    const data = {app:"Fitness Coach", version:"v34", exportedAt:new Date().toISOString(), data:{}};
    keys.forEach(k => data.data[k] = safeParse(k, null));
    const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `fitness-coach-backup-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  function initBackup(){
    $("exportJson")?.addEventListener("click", exportBackup);
    $("importJson")?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try{
          const parsed = JSON.parse(reader.result);
          if(!parsed.data) throw new Error("Invalid backup");
          if(!confirm("Import backup and replace matching local data?")) return;
          Object.entries(parsed.data).forEach(([k,v]) => localStorage.setItem(k, JSON.stringify(v)));
          alert("Backup imported. Reloading.");
          location.reload();
        }catch(err){ alert("Import failed. Choose a valid backup JSON."); }
      };
      reader.readAsText(file);
    });
    $("resetData")?.addEventListener("click", () => {
      if(!confirm("Export a backup before reset. Continue?")) return;
      if(!confirm("Final warning: this clears local app data on this device.")) return;
      ["workoutLogs","nutritionLogs","progressLogs","activityLogs","painLogs","supplementLogs","fitnessAssessments","functionalFitnessAssessments","coachSessionHistory"].forEach(k=>localStorage.removeItem(k));
      alert("Local logs reset.");
      location.reload();
    });
  }

  window.AdaptiveVoiceCoach = window.AdaptiveVoiceCoach || {
    enabled:true,
    speak(text){
      if(!this.enabled || !("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  };

  window.renderAll = function(){
    renderToday();
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initAssessments();
    initPain();
    initSupplements();
    initBackup();
    renderToday();
    setInterval(renderToday, 30000);
  });
})();


/* v35 RPG Avatar Builder + Safety-Audited Onboarding */
(function(){
  "use strict";
  const $ = id => document.getElementById(id);
  const state = { step:0, data:{} };
  const totalSteps = 12;

  function safeSave(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function safeParse(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
    catch(e){ return fallback; }
  }
  function num(id){ const n = Number($(id)?.value || 0); return Number.isFinite(n) ? n : 0; }

  function showStep(step){
    state.step = Math.max(0, Math.min(totalSteps-1, step));
    document.querySelectorAll(".rpg-step").forEach(el => el.classList.toggle("active", Number(el.dataset.rpgStep) === state.step));
    const bar = $("rpgProgressBar");
    if(bar) bar.style.width = `${Math.round((state.step/(totalSteps-1))*100)}%`;
  }

  function collectBasics(){
    state.data.name = $("rpgName")?.value?.trim() || state.data.name || "";
    state.data.age = num("rpgAge") || state.data.age || "";
    state.data.feet = num("rpgFeet") || state.data.feet || "";
    state.data.inches = num("rpgInches") || state.data.inches || "";
    state.data.weight = num("rpgWeight") || state.data.weight || "";
    state.data.goalWeight = num("rpgGoalWeight") || state.data.goalWeight || "";
    state.data.injuries = [...document.querySelectorAll("[data-rpg-injury]:checked")].map(x=>x.value);
  }

  function validateStep(){
    collectBasics();
    if(state.step === 1 && !state.data.name){ alert("Enter your name."); return false; }
    if(state.step === 2){
      if(!state.data.age || !state.data.feet || !state.data.weight || !state.data.goalWeight){
        alert("Enter age, height, current weight, and goal weight.");
        return false;
      }
    }
    const choiceSteps = {3:"goal",4:"activity",5:"liftingExperience",7:"bodyType",8:"motivation",9:"startingClass"};
    const key = choiceSteps[state.step];
    if(key && !state.data[key]){ alert("Choose one option to continue."); return false; }
    return true;
  }

  function scoreFunctional(){
    const input = {
      walkDistance: num("rpgWalkDistance"),
      perceivedEffort: num("rpgEffort") || 5,
      chairStandReps: num("rpgChair"),
      squatReps: num("rpgSquats"),
      pushUpReps: num("rpgPushups"),
      plankSeconds: num("rpgPlank"),
      shoulderPain: $("rpgMobilityShoulder")?.checked,
      kneePain: $("rpgMobilityKnee")?.checked,
      backPain: $("rpgMobilityBack")?.checked,
      concerningSymptoms: $("rpgConcerningSymptoms")?.checked
    };

    const chair = Math.min(30, input.chairStandReps / 20 * 30);
    const squat = Math.min(20, input.squatReps / 20 * 20);
    const push = Math.min(25, input.pushUpReps / 20 * 25);
    const plank = Math.min(25, input.plankSeconds / 90 * 25);
    const strengthScore = Math.round(chair + squat + push + plank);

    const walk = Math.min(75, input.walkDistance / 0.5 * 75);
    const effort = Math.max(0, 25 - Math.max(0, input.perceivedEffort - 5) * 5);
    const conditioningScore = Math.round(walk + effort);

    let mobilityScore = 100;
    if(input.shoulderPain) mobilityScore -= 20;
    if(input.kneePain) mobilityScore -= 20;
    if(input.backPain) mobilityScore -= 25;
    mobilityScore = Math.max(0, mobilityScore);

    const overallFitnessScore = Math.round(strengthScore*.4 + conditioningScore*.35 + mobilityScore*.25);

    let classification = "Beginner";
    if(overallFitnessScore >= 70 && mobilityScore >= 70) classification = "Intermediate";
    else if(overallFitnessScore >= 45) classification = "Novice";

    let recoveryRisk = "Low";
    if(mobilityScore < 70 || input.perceivedEffort >= 8) recoveryRisk = "Moderate";
    if(input.concerningSymptoms) recoveryRisk = "Elevated";

    return { input, scores:{strengthScore, conditioningScore, mobilityScore, overallFitnessScore, classification, recoveryRisk} };
  }

  function classAdvice(data, scores){
    if(scores.recoveryRisk === "Elevated"){
      return "Do not start intense training until concerning symptoms are reviewed. Use light walking only and seek medical guidance if symptoms are current or severe.";
    }
    if(scores.classification === "Beginner"){
      return "Start with lower weights, longer rest, form-first coaching, and slower progression.";
    }
    if(scores.classification === "Novice"){
      return "Use standard beginner progression with moderate coaching and careful pain monitoring.";
    }
    return "Use moderate progression and higher starting volume while continuing recovery checks.";
  }

  function finishWizard(){
    collectBasics();
    const assessment = scoreFunctional();
    const data = {...state.data, functionalAssessment: assessment, updatedAt:new Date().toISOString(), onboardingComplete:true};

    // Store as profile fields used by rest of app
    const profile = {
      name:data.name,
      age:data.age,
      feet:data.feet,
      inches:data.inches,
      weight:data.weight,
      goalWeight:data.goalWeight,
      goal:data.goal,
      activity:data.activity,
      experience:data.liftingExperience,
      injuries:data.injuries,
      bodyType:data.bodyType,
      motivation:data.motivation,
      startingClass:data.startingClass,
      fitnessClassification:assessment.scores.classification,
      recoveryRisk:assessment.scores.recoveryRisk,
      onboardingComplete:true,
      updatedAt:data.updatedAt
    };
    safeSave("userProfile", profile);

    const all = safeParse("functionalFitnessAssessments", []);
    all.push({date:new Date().toISOString().slice(0,10), ...assessment});
    safeSave("functionalFitnessAssessments", all);

    const fitness = safeParse("fitnessAssessments", []);
    fitness.push({date:new Date().toISOString().slice(0,10), ...data});
    safeSave("fitnessAssessments", fitness);

    const advice = classAdvice(data, assessment.scores);
    const box = $("rpgResults");
    if(box){
      box.innerHTML = `
        <div class="resultCard"><strong>${profile.name || "User"}</strong><br>Goal: ${profile.goalWeight} lbs<br>Class: ${profile.startingClass || "Explorer"}</div>
        <div class="resultCard"><strong>Overall Score</strong><br>${assessment.scores.overallFitnessScore}/100<br>${assessment.scores.classification}</div>
        <div class="resultCard"><strong>Strength</strong><br>${assessment.scores.strengthScore}/100</div>
        <div class="resultCard"><strong>Conditioning</strong><br>${assessment.scores.conditioningScore}/100</div>
        <div class="resultCard"><strong>Mobility</strong><br>${assessment.scores.mobilityScore}/100</div>
        <div class="resultCard"><strong>Recovery Risk</strong><br>${assessment.scores.recoveryRisk}</div>
        <div class="resultCard"><strong>What this means</strong><br>${advice}</div>
      `;
    }

    if(window.renderAll) window.renderAll();
    if(window.renderDynamicGoalHeader) window.renderDynamicGoalHeader();
    showStep(11);
  }

  function initRpgOnboarding(){
    const wizard = $("rpgWizard");
    $("startRpgWizard")?.addEventListener("click", ()=>{ wizard?.classList.remove("hidden"); showStep(0); });
    $("retakeRpgWizard")?.addEventListener("click", ()=>{ wizard?.classList.remove("hidden"); showStep(0); });
    $("closeRpgWizard")?.addEventListener("click", ()=>{ wizard?.classList.add("hidden"); });

    document.querySelectorAll("[data-rpg-next]").forEach(btn => btn.addEventListener("click", () => {
      if(validateStep()) showStep(state.step + 1);
    }));
    document.querySelectorAll("[data-rpg-prev]").forEach(btn => btn.addEventListener("click", () => showStep(state.step - 1)));

    document.querySelectorAll("[data-rpg-choice]").forEach(group => {
      group.querySelectorAll("button[data-value]").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = group.dataset.rpgChoice;
          state.data[key] = btn.dataset.value;
          group.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
          btn.classList.add("selected");
        });
      });
    });

    $("finishRpgWizard")?.addEventListener("click", finishWizard);

    // If no profile exists, prompt gently after load without trapping user.
    setTimeout(() => {
      const p = safeParse("userProfile", null);
      if(!p || !p.onboardingComplete){
        const hero = document.querySelector("#rpgOnboarding");
        if(hero && !localStorage.getItem("rpgOnboardingDismissed")) {
          document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
          hero.classList.add("active");
        }
      }
    }, 400);
  }

  document.addEventListener("DOMContentLoaded", initRpgOnboarding);
})();


/* v36 Visible RPG Onboarding Fix */
(function(){
  "use strict";
  const $ = id => document.getElementById(id);
  const safeParse = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||"null")??f}catch(e){return f}};
  const safeSave = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const state = {step:0,data:{}};

  function showProfilePreview(){
    const p = safeParse("userProfile", null);
    const box = $("currentProfilePreview");
    if(!box) return;
    if(!p){
      box.textContent = "No profile created yet.";
      return;
    }
    box.innerHTML = `<strong>${p.name || "User"}</strong><br>Goal: ${p.goalWeight || 195} lbs<br>Class: ${p.startingClass || p.fitnessClassification || "Not set"}<br>Avatar: ${p.bodyType || "Not set"}`;
  }

  function openWizard(){
    const w = $("rpgWizard");
    if(!w){
      alert("Profile setup wizard was not found. Re-upload the v36 files.");
      return;
    }
    w.classList.remove("hidden");
    showStep(0);
  }

  function showStep(n){
    const steps = [...document.querySelectorAll(".rpg-step")];
    const max = steps.length - 1;
    state.step = Math.max(0, Math.min(max, n));
    steps.forEach(el => el.classList.toggle("active", Number(el.dataset.rpgStep) === state.step));
    const bar = $("rpgProgressBar");
    if(bar) bar.style.width = `${Math.round((state.step/max)*100)}%`;
  }

  function collect(){
    const num = id => Number($(id)?.value || 0);
    state.data.name = $("rpgName")?.value?.trim() || state.data.name || "";
    state.data.age = num("rpgAge") || state.data.age || "";
    state.data.feet = num("rpgFeet") || state.data.feet || "";
    state.data.inches = num("rpgInches") || state.data.inches || "";
    state.data.weight = num("rpgWeight") || state.data.weight || "";
    state.data.goalWeight = num("rpgGoalWeight") || state.data.goalWeight || 195;
  }

  function score(){
    const num = id => Number($(id)?.value || 0);
    const walk = Math.min(40, (num("rpgWalkDistance")/0.5)*40);
    const chair = Math.min(25, (num("rpgChair")/20)*25);
    const push = Math.min(20, (num("rpgPushups")/20)*20);
    const plank = Math.min(15, (num("rpgPlank")/90)*15);
    const effortPenalty = Math.max(0, (num("rpgEffort")-7)*5);
    const overall = Math.max(0, Math.round(walk+chair+push+plank-effortPenalty));
    let classification = "Beginner";
    if(overall >= 70) classification = "Intermediate";
    else if(overall >= 45) classification = "Novice";
    const recoveryRisk = $("rpgConcerningSymptoms")?.checked ? "Elevated" : "Low";
    return {overallFitnessScore:overall, classification, recoveryRisk};
  }

  function finish(){
    collect();
    const scores = score();
    const profile = {
      name: state.data.name || "User",
      age: state.data.age,
      feet: state.data.feet,
      inches: state.data.inches,
      weight: state.data.weight,
      goalWeight: state.data.goalWeight,
      startingClass: state.data.startingClass || "explorer",
      bodyType: state.data.bodyType || "average",
      fitnessClassification: scores.classification,
      recoveryRisk: scores.recoveryRisk,
      onboardingComplete: true,
      updatedAt: new Date().toISOString()
    };
    safeSave("userProfile", profile);
    const rows = safeParse("functionalFitnessAssessments", []);
    rows.push({date:new Date().toISOString().slice(0,10), scores});
    safeSave("functionalFitnessAssessments", rows);

    const box = $("rpgResults");
    if(box){
      box.innerHTML = `
        <div class="resultBox"><strong>${profile.name}</strong><br>Goal Weight: ${profile.goalWeight} lbs<br>Avatar: ${profile.bodyType}<br>Class: ${profile.startingClass}</div>
        <div class="resultBox"><strong>Fitness Score</strong><br>${scores.overallFitnessScore}/100<br>${scores.classification}</div>
        <div class="resultBox"><strong>Recovery Risk</strong><br>${scores.recoveryRisk}</div>
      `;
    }
    if(window.renderAll) window.renderAll();
    showProfilePreview();
    showStep(5);
  }

  function init(){
    $("openVisibleRpgSetup")?.addEventListener("click", openWizard);
    $("showCurrentProfile")?.addEventListener("click", showProfilePreview);
    $("startRpgWizard")?.addEventListener("click", openWizard);
    $("retakeRpgWizard")?.addEventListener("click", openWizard);
    $("closeRpgWizard")?.addEventListener("click", ()=>$("rpgWizard")?.classList.add("hidden"));
    document.querySelectorAll("[data-rpg-next]").forEach(b=>b.addEventListener("click",()=>{collect();showStep(state.step+1)}));
    document.querySelectorAll("[data-rpg-prev]").forEach(b=>b.addEventListener("click",()=>showStep(state.step-1)));
    document.querySelectorAll("[data-rpg-choice]").forEach(group=>{
      group.querySelectorAll("button[data-value]").forEach(btn=>{
        btn.addEventListener("click",()=>{
          state.data[group.dataset.rpgChoice]=btn.dataset.value;
          group.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));
          btn.classList.add("selected");
        });
      });
    });
    $("finishRpgWizard")?.addEventListener("click", finish);
    showProfilePreview();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
