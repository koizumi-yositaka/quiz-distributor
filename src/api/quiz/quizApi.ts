import type { TPageDesign } from "../../types/componentType";
import axiosInstance from "../axiosInstance";
import type { AxiosResponse } from "axios";

type TQuiz = {
  pageDesign: TPageDesign[];
}

export type TQuizResult = {
  result: Record<string, string>;
  score: number;
  totalQ: number;
}

export type TAnswerQuiz = {
  answeredUserId: string;
  quizId: string;
  answer: Record<string, string>;
}

export const quizApi = {
  getQuiz: async (quizId: string, email: string) => {
    const response: AxiosResponse<TQuiz> = await axiosInstance.post(`/getQuiz`, { quizId, email });
    return response.data.pageDesign;
  },
  answerQuiz: async (answerQuiz: TAnswerQuiz) => {
    const response: AxiosResponse<TQuizResult> = await axiosInstance.post(`/quiz/answer`, answerQuiz);
    return response.data;
  }
};
