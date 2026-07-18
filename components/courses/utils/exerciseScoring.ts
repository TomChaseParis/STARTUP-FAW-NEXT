import { ScoreLevel } from "../common/types/exerciseSessionTypes";
/**
 * Calcule un score sur 100.
 */
export function computeScore(
  correctAnswers: number,
  totalQuestions: number,
): number {
  if (totalQuestions === 0) return 0;

  return Math.round((correctAnswers / totalQuestions) * 100);
}

/**
 * Retourne le niveau pédagogique.
 */
export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 95) return "Excellent";

  if (score >= 85) return "Très bien";

  if (score >= 70) return "Bien";

  if (score >= 50) return "Moyen";

  return "À revoir";
}

/**
 * Couleur principale utilisée dans l'UI.
 */
export function getScoreColor(score: number): string {
  if (score >= 95) return "green";

  if (score >= 85) return "emerald";

  if (score >= 70) return "amber";

  if (score >= 50) return "orange";

  return "red";
}

/**
 * Message affiché sous le score.
 */
export function getScoreMessage(score: number): string {
  if (score >= 95) {
    return "Excellent travail ! Tu maîtrises parfaitement cette compétence.";
  }

  if (score >= 85) {
    return "Très bon travail ! Tu es presque au niveau parfait.";
  }

  if (score >= 70) {
    return "Bon résultat ! Continue à t'entraîner pour progresser encore.";
  }

  if (score >= 50) {
    return "Tu progresses. Quelques révisions te permettront de consolider cette notion.";
  }

  return "Cette notion mérite d'être retravaillée. N'hésite pas à refaire l'exercice.";
}

/**
 * Nombre d'étoiles (0 → 5)
 */
export function getStars(score: number): number {
  if (score >= 95) return 5;

  if (score >= 85) return 4;

  if (score >= 70) return 3;

  if (score >= 50) return 2;

  if (score >= 25) return 1;

  return 0;
}

/**
 * Pourcentage de réussite.
 */
export function getSuccessRate(
  correctAnswers: number,
  totalQuestions: number,
): number {
  if (totalQuestions === 0) return 0;

  return Number(((correctAnswers / totalQuestions) * 100).toFixed(1));
}
