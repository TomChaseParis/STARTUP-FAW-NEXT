export type FreePart =
  | { type: "text"; value: string }
  | {
      type: "input";
      placeholder?: string;
    };

export type FreeSentence = {
  id: number;
  parts: FreePart[];
};

export type FreeTextData = {
  title?: string;
  instruction?: string;
  sentences: FreeSentence[];
};