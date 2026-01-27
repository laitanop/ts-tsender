import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  large?: boolean;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  type = "text",
  large = false,
  onChange,
  className = "",
  disabled = false,
}) => {
  const baseStyles = `
    w-full px-4 py-2 rounded-lg border-2 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const inputStyles = `
    ${baseStyles}
    bg-white border-[#ffdccc] text-[#5d2a42]
    focus:border-[#fb6376] focus:ring-[#fcb1a6]
    placeholder:text-[#fcb1a6] placeholder:opacity-60
  `;

  const textareaStyles = `
    ${baseStyles}
    bg-white border-[#ffdccc] text-[#5d2a42]
    focus:border-[#fb6376] focus:ring-[#fcb1a6]
    placeholder:text-[#fcb1a6] placeholder:opacity-60
    resize-y min-h-[120px]
  `;

  const labelStyles = `
    block mb-2 text-sm font-semibold
    text-[#5d2a42]
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={labelStyles}>{label}</label>}
      {large ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={textareaStyles}
          disabled={disabled}
          rows={6}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputStyles}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;
