import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  className = "",
}: AuthCardProps) {
  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-2xl w-full max-w-md ${className}`}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
