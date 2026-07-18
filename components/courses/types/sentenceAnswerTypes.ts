export type SentenceAnswerItem = {
  id: number;

  /**
   * Image associée à la question
   */
  image: string;

  /**
   * Question posée par le professeur
   */
  question: string;

  /**
   * Audio de la question (Étienne)
   */
  questionAudio?: string;

  /**
   * Réponse attendue exactement
   */
  answer: string;

  /**
   * Explication grammaticale affichée après validation
   */
  explanation: string;

  /**
   * Réponse affirmative ou négative
   */
  polarity: "affirmative" | "negative";
};

export type SentenceAnswerData = {
  title: string;

  instruction: string;

  items: SentenceAnswerItem[];
};