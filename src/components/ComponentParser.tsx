import type { TInputComponent } from "../types/componentType";
import { InputRadio } from "./input/imp/InputRadio";

type props = {
  props: TInputComponent;
};
export const ComponentParser: React.FC<props> = ({ props }) => {
  return (
    <div>
      <p className="mb-2 text-gray-700 font-size-md">
        {props.content.qIndex}. {props.content.q}
      </p>
      {props.type === "radio" && (
        <InputRadio
          q={props.content.q}
          qIndex={props.content.qIndex}
          name={props.content.name}
          register={props.content.register}
          errors={props.content.errors}
          options={props.content.options}
          required={props.content.required}
        />
      )}
    </div>
  );
};
