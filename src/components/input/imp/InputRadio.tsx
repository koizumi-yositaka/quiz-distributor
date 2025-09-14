import React from "react";
import type { TInputContent, TRadioOption } from "../../../types/componentType";

export const InputRadio: React.FC<TInputContent> = ({
  q,
  name,
  options,
  register,
  errors,
  required,
}) => {
  console.log(q);
  return (
    <div className="mb-4">
      <div>
        {options.map((option: TRadioOption) => (
          <div className="flex items-center space-x-2" key={option.id}>
            <label
              key={option.value}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="radio"
                {...register(name, required)}
                value={option.value}
                className="peer sr-only"
              />
              <span
                className="w-5 h-5 border-2 border-gray-400 rounded-full inline-block 
              peer-checked:border-blue-500 peer-checked:bg-blue-500"
              ></span>
              <span className="ml-2 text-gray-700">{option.label}</span>
            </label>
          </div>
        ))}
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">
            {(errors[name]?.message as string) || "必須項目です"}
          </p>
        )}
      </div>
    </div>
  );
};
