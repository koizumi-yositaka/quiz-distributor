import { QuizContainer } from "../components/quiz/QuizContainer";
import { useLocation } from "react-router-dom";

export const Quiz = () => {
  const location = useLocation();
  const quizId = location.state.quizId;
  const email = location.state.email;
  return (
    <>
      {quizId && email ? (
        <QuizContainer quizId={quizId} email={email} />
      ) : (
        <div>QuizId or Email is not found</div>
      )}
    </>
  );
};
