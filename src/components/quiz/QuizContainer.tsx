import { QuizPresentation } from "./QuizPresentation";
import { useQuiz } from "../../hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import type { TAnswerQuiz } from "../../api/quiz/quizApi";
export const QuizContainer = ({
  quizId,
  email,
}: {
  quizId: string;
  email: string;
}) => {
  const { quiz, error, answerQuiz, quizResult } = useQuiz({
    quizId,
    email,
  });
  const navigate = useNavigate();

  const onSubmit = async (data: Record<string, string>) => {
    const answerQuizParams: TAnswerQuiz = {
      answeredUserId: email,
      quizId: quizId,
      answer: data,
    };
    await answerQuiz(answerQuizParams);
    navigate(`/complete`, { state: { quizResult } });
  };
  if (error) {
    navigate(`/error`, { state: { error } });
  }
  return (
    <>
      <QuizPresentation pageDesign={quiz} onSubmit={onSubmit} />
    </>
  );
};
