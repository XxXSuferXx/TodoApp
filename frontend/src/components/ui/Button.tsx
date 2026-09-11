import { ButtonHTMLAttributes, ReactNode } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size : "md" | "sm" | "lg";
}

const baseStyles = "px-4 py-2 rounded-md text-sm font-medium transition-colours";

const variantStyles = {
  primary: "bg-primary-600 text-white hover:bg-gray-400",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
};

const sizeStyles = {
  sm: "px-2 py-4",
  md: "px-4 py-6",
  lg: "px-6 py-8"
}

export function Button({children, size ="sm", variant = "primary", className = "bg-red-500", ...rest} : ButtonProps) {
  return (
  <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...rest}>
    {children}
  </button>
);
}