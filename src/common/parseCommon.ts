import type { TPageDesign } from "../types/componentType";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
export const parsePageDesign = (pageDesign: TPageDesign[], register: UseFormRegister<any>, errors: FieldErrors<any>) => // eslint-disable-line @typescript-eslint/no-explicit-any
    pageDesign.map((page) => {
    return {
        ...page,
        components: page.components.map((component) => {
        return {
            ...component,
            content: {
            ...component.content,
            register: register,
            errors: errors,
            required: {
                required: component.content.requiredMessage,
            },
            },
        };
        }),
    };
});