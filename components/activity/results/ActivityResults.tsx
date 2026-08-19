type ActivityResultsProps = {
  score: number;
  duration: number;
  stars: number;
  attempts: number;
  bestScore: number;

  onRestart: () => void;
  onNext: () => void;
};