import type { TPageDesign } from "../types/componentType";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
export const parsePageDesign = (pageDesign: TPageDesign[], register: UseFormRegister<any>, errors: FieldErrors<any>) => {// eslint-disable-line @typescript-eslint/no-explicit-any
    const parsedPageDesign = pageDesign.map((page) => {
        console.log("page common",page); // ここでpageが取得できているか確認
        return {
            ...page,
            components: page.components.map((component) => {
                const optionId = component.content.name;
                return {
                    ...component,
                    content: {
                        ...component.content,
                        register: register,
                        errors: errors,
                        required: {
                            required: component.content.requiredMessage,
                        },
                        options: component.content.options.map((option) => {
                            return {
                                ...option,
                                id: optionId,
                            };
                        }),
                    },
                };
            }),
        };
    });
    console.log("parsedPageDesign",parsedPageDesign); // ここでparsedPageDesignが取得できているか確認
    return parsedPageDesign;
}