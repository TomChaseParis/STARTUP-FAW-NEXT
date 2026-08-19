export interface TableCompletionItem {
  id: string;

  before: string;

  after: string;

  options: string[];

  answer: string;

  hint?: string;
}

export interface TableCompletionActivity {
  title: string;

  instruction: string;

  questions: TableCompletionItem[];
}