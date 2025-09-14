import { useCallback, useEffect, useState } from "react";
import type { TPageDesign } from "../types/componentType";
import { quizApi, type TAnswerQuiz, type TQuizResult } from "../api/quiz/quizApi";
import { AxiosError } from "axios";
import { type ErrorInfo } from "../types/type";

import { useAuth } from "../context/AuthContext";
export type UseQuizResult = {
  quiz: TPageDesign[];
  isPending: boolean;
  error: ErrorInfo | null;
};

export type UseQuizParam = {
  quizId: string;
  email: string;
}
export const useQuiz = (param: UseQuizParam) => {

  const [quiz, setQuiz] = useState<TPageDesign[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [quizResult, setQuizResult] = useState<TQuizResult | null>(null);
  const accessToken = useAuth();  
  useEffect(() => {
    
    const getQuiz = async () => {
      try {
        setIsPending(true);
        if(!param.quizId || !param.email) {
          setError(null);
          setQuiz([]);
          return;
        }
        setError(null);
        const quiz = await quizApi.getQuiz(param.quizId, param.email, accessToken ?? "");
        setQuiz(quiz);
      } catch(error) {
        const errorInfo = error as AxiosError<ErrorInfo>;
        console.error(errorInfo);
        setQuiz([]);
        setError(
            { 
              message: errorInfo.response?.data.message ?? "", 
              code: errorInfo.response?.data.code ?? "", 
              requestId: errorInfo.response?.data.requestId ?? "", 
              status: errorInfo.status ?? 500 
            }
        );
      } finally {
        setIsPending(false);
      }
    };
    getQuiz();
  }, [param.quizId, param.email]);


  const answerQuiz = useCallback(async (answer: TAnswerQuiz) => {
    try {
      setIsPending(true);
      const result = await quizApi.answerQuiz(answer);
      setQuizResult(result);
      return result;
    } catch (error) {
      const errorInfo = error as AxiosError<ErrorInfo>;
      setQuizResult(null);
      setError(
          { 
            message: errorInfo.response?.data.message ?? "", 
            code: errorInfo.response?.data.code ?? "", 
            requestId: errorInfo.response?.data.requestId ?? "", 
            status: errorInfo.status ?? 500 
          }
      );
    } finally {
      setIsPending(false);
    }
  }, []);
  
  return { quiz, isPending, quizResult, answerQuiz, error };
};