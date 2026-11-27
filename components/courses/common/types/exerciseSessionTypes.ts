
export type ExerciseDialogueSegment =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "answer";
      questionId: number;
    };

export interface ExerciseDialogueLine {
  speaker: string;
  segments: ExerciseDialogueSegment[];
}

export interface ExerciseHistoryPresentation {
  kind: "dialogue";
  lines: ExerciseDialogueLine[];
}

export interface ExerciseHistoryItem {
  /**
   * Identifiant de la question
   */
  questionId: number;

  /**
   * Énoncé de la question
   */
  question: string;

  /**
   * Réponse de l'étudiant
   */
  selectedAnswer: string;

  /**
   * Réponse attendue
   */
  correctAnswer: string;

  /**
   * Réussite
   */
  isCorrect: boolean;

  /**
   * Explication pédagogique
   */
  explanation?: string;

  /**
   * Temps de réponse (en secondes)
   */
  duration?: number;

  /**
   * Présentation groupée facultative.
   * Utilisée notamment pour afficher un dialogue complet
   * dans un seul bloc de correction.
   */
  presentation?: ExerciseHistoryPresentation;
}

export interface ExerciseSessionResult {
  /**
   * Score sur 100
   */
  score: number;

  /**
   * Nombre de bonnes réponses
   */
  correctAnswers: number;

  /**
   * Nombre total de questions
   */
  totalQuestions: number;

  /**
   * Historique complet
   */
  history: ExerciseHistoryItem[];

  /**
   * Début de la tentative
   */
  startedAt: Date;

  /**
   * Fin de la tentative
   */
  finishedAt: Date | null;

  /**
   * Durée totale (secondes)
   */
  duration: number;
}

export interface ExerciseSessionState {
  currentIndex: number;
  correctAnswers: number;
  history: ExerciseHistoryItem[];
  isFinished: boolean;
  startedAt: Date;
  finishedAt: Date | null;
}

export type ScoreLevel =
  | "Excellent"
  | "Très bien"
  | "Bien"
  | "Moyen"
  | "À revoir";
