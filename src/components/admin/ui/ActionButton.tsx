import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100",
  secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
  ghost: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizeClasses = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
};

export function ActionButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading,
  disabled,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
