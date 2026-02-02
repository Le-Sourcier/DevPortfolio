import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export function FormField({ label, required, children, hint }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

interface FormInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "url" | "date" | "password";
  required?: boolean;
  disabled?: boolean;
}

export function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  disabled,
}: FormInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="w-full h-11 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

interface FormTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function FormTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: FormTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-800 transition-all resize-none"
    />
  );
}
