type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        className="w-full border rounded-md p-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}