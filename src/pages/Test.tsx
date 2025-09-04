import { useForm } from "react-hook-form";

import { PageParser } from "../components/PageParser";
import type { TPage, TPageDesign } from "../types/componentType";
import { useState, useEffect } from "react";
import { parsePageDesign } from "../common/parseCommon";
import { Complete } from "../components/layout/Complete";
const initialPages: TPageDesign[] = [
  {
    pageId: "1",
    components: [
      {
        id: "1",
        type: "radio",
        answer: "test1",
        content: {
          q: "test",
          qIndex: 1,
          name: "tesAAAA",
          options: [
            { id: "1", label: "test1", value: "test1" },
            { id: "2", label: "test2", value: "test2" },
            { id: "3", label: "test3", value: "test3" },
          ],
          requiredMessage: "この項目は必須です",
        },
      },
      {
        id: "2",
        type: "radio",
        answer: "test2",
        content: {
          q: "test",
          qIndex: 2,
          name: "testBBBB",
          options: [
            { id: "1", label: "test1", value: "test1" },
            { id: "2", label: "test2", value: "test2" },
            { id: "3", label: "test3", value: "test3" },
          ],
          requiredMessage: "この項目は必須です",
        },
      },
    ],
  },
  {
    pageId: "4",
    components: [
      {
        id: "1",
        type: "radio",
        answer: "test3",
        content: {
          q: "test",
          qIndex: 3,
          name: "tesAAAAVVVAA",
          options: [
            { id: "1", label: "test1", value: "test1" },
            { id: "2", label: "test2", value: "test2" },
            { id: "3", label: "test3", value: "test3" },
          ],
          requiredMessage: "",
        },
      },
      {
        id: "5",
        type: "radio",
        answer: "test4",
        content: {
          q: "test",
          qIndex: 4,
          name: "testRRRRBBBB",
          options: [
            { id: "1", label: "test1", value: "test1" },
            { id: "2", label: "test2", value: "test2" },
            { id: "3", label: "test3", value: "test3" },
          ],
          requiredMessage: "この項目は必須です",
        },
      },
    ],
  },
];
export const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data: Record<string, string | undefined>) => {
    console.log(data);
    setIsComplete(true);
  };

  const [pagesDesign, setPagesDesign] = useState(
    JSON.stringify(initialPages, null, 2)
  );
  const [pages, setPages] = useState<TPage[]>([]);
  const [parseError, setParseError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

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
  return (
    <div className="flex h-screen">
      {/* 左側 */}
      <div className="w-1/2 border  p-4">
        <textarea
          className={`w-full h-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          value={pagesDesign}
          onChange={handlePagesDesignChange}
        />
      </div>

      {/* 右側 */}
      <div className="w-1/2 border  p-4">
        {parseError ? (
          <p className="text-red-500">{parseError}</p>
        ) : isComplete ? (
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
