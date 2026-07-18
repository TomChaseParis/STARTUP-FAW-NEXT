export type TransformationPart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "input";
      answer: string;
      width?: number;
    };

export type TransformationColumn = {
  title: string;
  parts: TransformationPart[];
};

export type TransformationRow = {
  id: number;
  image: string;
  columns: [
    TransformationColumn,
    TransformationColumn,
    TransformationColumn,
  ];
};

export type TransformationTableData = {
  title: string;
  instruction: string;
  rows: TransformationRow[];
};