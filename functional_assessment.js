
window.FunctionalFitnessAssessment = {
  key: 'functionalFitnessAssessments',

  save(result) {
    const rows = JSON.parse(localStorage.getItem(this.key) || '[]');
    rows.push(result);
    localStorage.setItem(this.key, JSON.stringify(rows));
  },

  getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },

  score(input) {
    const chair = Math.min(40, (Number(input.chairStandReps || 0) / 20) * 40);
    const push = Math.min(30, (Number(input.pushUpReps || 0) / 20) * 30);
    const plank = Math.min(30, (Number(input.plankSeconds || 0) / 90) * 30);
    const strengthScore = Math.round(chair + push + plank);

    const walk = Math.min(60, (Number(input.walkDistance || 0) / 0.5) * 60);
    const effort = Math.max(0, 20 - Math.max(0, Number(input.perceivedEffort || 5) - 5) * 4);
    const conditioningScore = Math.round(walk + effort);

    let mobilityScore = 100;
    ['shoulderPain','kneePain','backPain','squatPain'].forEach(flag => {
      if (input[flag]) mobilityScore -= 20;
    });
    mobilityScore = Math.max(0, mobilityScore);

    const overallFitnessScore = Math.round((strengthScore * 0.4) + (conditioningScore * 0.35) + (mobilityScore * 0.25));

    let classification = 'beginner';
    if (overallFitnessScore >= 70 && mobilityScore >= 70) classification = 'intermediate';
    else if (overallFitnessScore >= 45) classification = 'novice';

    let recoveryRisk = 'low';
    if (mobilityScore < 70 || Number(input.perceivedEffort || 0) >= 8) recoveryRisk = 'moderate';
    if (input.chestPain || input.dizziness || input.shortnessOfBreath || input.numbness) recoveryRisk = 'elevated';

    return {
      strengthScore,
      conditioningScore,
      mobilityScore,
      overallFitnessScore,
      classification,
      recoveryRisk
    };
  },

  nextReassessmentDate(date = new Date()) {
    const d = new Date(date);
    d.setDate(d.getDate() + 56);
    return d.toISOString().slice(0, 10);
  }
};
