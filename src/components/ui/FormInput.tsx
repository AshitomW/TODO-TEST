interface FormInputProps {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function FormInput({
  label,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
  className = "",
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
