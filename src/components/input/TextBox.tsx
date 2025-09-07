import React from "react";

type TextBoxProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

const TextBox: React.FC<TextBoxProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
  readOnly = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${error ? "border-red-500" : "border-gray-300"} 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} 
          ${className}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextBox;
