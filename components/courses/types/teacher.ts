export type Teacher = {
  id: string;

  name: string;

  avatar: string;

  voice?: string;

  audio?: {
    intro?: string;
    question?: string;
    correct?: string;
    wrong?: string;
    outro?: string;
  };

  bubbleColor?: string;

  accentColor?: string;
};