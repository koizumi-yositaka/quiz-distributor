import React, { useState } from "react";
import type { TPage, TPageDesign } from "../../types/componentType";
import { useForm } from "react-hook-form";
import { parsePageDesign } from "../../common/parseCommon";
import { PageParser } from "../PageParser";
export const QuizPresentation = ({
  pageDesign,
  onSubmit,
}: {
  pageDesign: TPageDesign[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
}) => {
  console.log("rendered");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [pages] = useState<TPage[]>(
    parsePageDesign(pageDesign, register, errors)
  );
  return (
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
  );
};
