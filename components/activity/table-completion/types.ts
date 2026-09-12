export interface TableCompletionImage {
  id: string;
  src: string;
  alt: string;
}

export interface TableCompletionItem {
  id: string;

  /**
   * Type de question.
   *
   * - "text" : question classique du tableau
   * - "image" : sélection d'une image
   *
   * Si le type n'est pas renseigné, la question
   * est considérée comme une question texte classique.
   */
  type?: "text" | "image";

  before: string;
  after: string;

  options: string[];

  answer: string;

  hint?: string;

  /**
   * Utilisé uniquement pour les questions de type "image".
   */
  images?: TableCompletionImage[];
}

export interface TableCompletionActivity {
  title: string;

  instruction: string;

  questions: TableCompletionItem[];
}