export type ImageChoiceDialogue = {
  id: string;
  dialogue: string[];
  audio: string;
};

export type ImageChoiceItem = {
  id: number;
  image: string;
  correctDialogue: string;
  choices: string[];
};

export type ImageChoiceData = {
  dialogues: ImageChoiceDialogue[];
  questions: ImageChoiceItem[];
};