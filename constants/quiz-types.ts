export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  timeLimit: number;
};

export type QuizProgress = {
  currentIndex: number;
  score: number;
  timeLeft: number;
  totalTimeLeft: number;
};
