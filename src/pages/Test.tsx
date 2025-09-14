import { useForm } from "react-hook-form";

import { PageParser } from "../components/PageParser";
import type { TPage, TPageDesign } from "../types/componentType";
import { useState, useEffect } from "react";
import { parsePageDesign } from "../common/parseCommon";
import { Complete } from "../components/layout/Complete";
import {
  quizApi,
  type TAnswerQuiz,
  type TQuizResult,
} from "../api/quiz/quizApi";

const initialPages: TPageDesign[] = [];
export const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [pagesDesign, setPagesDesign] = useState(
    JSON.stringify(initialPages, null, 2)
  );
  const [pages, setPages] = useState<TPage[]>([]);
  const [parseError, setParseError] = useState("");
  const [quizResult, setQuizResult] = useState<TQuizResult | null>(null);

  // quizId
  const [quizId, setQuizId] = useState("");
  const [email, setEmail] = useState("yositaka.koizumi@escco.co.jp");

  // registerとerrorsが変更されたときにpagesを更新
  useEffect(() => {
    try {
      setParseError("");
      setPages(
        parsePageDesign(
          JSON.parse(pagesDesign) as TPageDesign[],
          register,
          errors
        )
      );
    } catch {
      setParseError("JSONのパースに失敗しました");
    }
  }, [register, errors, pagesDesign]);

  const handlePagesDesignChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPagesDesign(e.target.value);
  };

  const handleGetQuiz = async () => {
    const quiz = await quizApi.getQuiz(quizId, email,"");
    setQuizResult(null);
    setPagesDesign(JSON.stringify(quiz, null, 2));
  };
  const onSubmit = async (data: Record<string, string>) => {
    console.log(data);
    const answerQuiz: TAnswerQuiz = {
      answeredUserId: email,
      quizId: quizId,
      answer: data,
    };
    const result = await quizApi.answerQuiz(answerQuiz);
    setQuizResult(result);
  };
  return (
    <div className="flex h-screen">
      {/* 左側 */}
      <div className="w-1/2 border  p-4">
        <input
          type="text"
          value={quizId}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setQuizId(e.target.value)}
        />
        <input
          type="text"
          value={email}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleGetQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          取得
        </button>
        <textarea
          className={`w-full h-[400px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          value={pagesDesign}
          onChange={handlePagesDesignChange}
        />
      </div>

      {/* 右側 */}
      <div className="w-1/2 border  p-4">
        {parseError ? (
          <p className="text-red-500">{parseError}</p>
        ) : quizResult ? (
          <Complete />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="h-full">
            <PageParser
              pages={pages}
              isValid={isValid}
              submitButton={
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  送信
                </button>
              }
            />
          </form>
        )}
      </div>
    </div>
  );
};
