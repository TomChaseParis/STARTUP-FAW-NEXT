export type ClassificationCategory = {
  id: string;
  title: string;
  emoji?: string;
  color: "green" | "red" | "blue" | "amber";
};

export type ClassificationItem = {
  id: number;

  text: string;

  audio?: string;

  categoryId: string;
};

export type ClassificationData = {
  title: string;

  instruction: string;

  categories: ClassificationCategory[];

  items: ClassificationItem[];
};