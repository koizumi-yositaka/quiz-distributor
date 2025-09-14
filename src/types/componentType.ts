import type { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";    


export type TPage = {
    pageId: string;
    components: TInputComponent[];
}

export type TInputComponent = {
    id: string;
    type: EnumInputComponentType;
    content: TInputContent;
    answer: string;
}

export type TInputContent = {
    q: string;
    qIndex: number;
    name: string;
    options: TRadioOption[];
    register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    errors: FieldErrors<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    required: RegisterOptions;
}



export type TRadioOption = {
    id: string;
    label: string;
    value: string;
}

// 設計用の型 lambdaとも共通
export type TPageDesign = {
    pageId: string;
    components: TInputComponentDesign[];
}
export type TInputComponentDesign = {
    id: string;
    type: EnumInputComponentType;
    content: TInputContentDesign;
    answer: string;
}
export type TInputContentDesign = {
    q: string;
    qIndex: number;
    name: string;
    options: TRadioOption[];
    requiredMessage: string;
}

export type EnumInputComponentType = "radio";