import { useLocation } from "react-router-dom";
import type { TQuizResult } from "../../api/quiz/quizApi";

export const Complete = () => {
  const result = useLocation().state.quizResult as TQuizResult;
  return (
    <div>
      <h1>Complete</h1>
      <p>Score: {result.score}</p>
      <p>Total: {result.totalQ}</p>
      <p>Result: {JSON.stringify(result.result)}</p>
    </div>
  );
};
