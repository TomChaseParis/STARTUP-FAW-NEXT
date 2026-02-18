export function computeScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getScoreLevel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Très bien";
  if (score >= 60) return "Bien";
  if (score >= 40) return "À renforcer";
  return "À retravailler";
}
