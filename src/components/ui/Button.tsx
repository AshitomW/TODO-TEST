import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary border-primary text-primary-foreground hover:opacity-80",
    secondary:
      "border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
