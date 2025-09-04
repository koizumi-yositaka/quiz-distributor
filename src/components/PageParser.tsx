import type { TPage } from "../types/componentType";
import { ComponentParser } from "./ComponentParser";
import { useState } from "react";
import { QuestionPage } from "./layout/QuestionPage";

export type PageParserProps = {
  pages: TPage[];
  submitButton: React.ReactNode;
  isValid?: boolean;
};
export const PageParser: React.FC<PageParserProps> = ({
  pages,
  submitButton,
  isValid,
}) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const prevButton =
    selectedPage > 0 ? (
      <button
        onClick={() => setSelectedPage(selectedPage - 1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        戻る
      </button>
    ) : null;
  const nextButton =
    selectedPage < pages.length - 1 ? (
      <button
        onClick={() => setSelectedPage(selectedPage + 1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        進む
      </button>
    ) : null;

  return (
    <div className="h-full flex flex-col">
      {pages.map((page, index) => (
        <QuestionPage
          key={`page-${index}`}
          total={pages.length}
          current={index + 1}
          prev={prevButton}
          next={nextButton}
          className={selectedPage === index ? "block" : "hidden"}
        >
          {page.components.map((component, index) => (
            <ComponentParser key={`q-${index}`} props={component} />
          ))}
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">入力エラーがあります</p>
          )}
          {index === pages.length - 1 && submitButton}
        </QuestionPage>
      ))}
    </div>
  );
};
