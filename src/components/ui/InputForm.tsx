import type {
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

interface TInput<T extends FieldValues> {
  label: string;
  placeholder: string;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>; // تابع register
  rules?: RegisterOptions<T, Path<T>>; // ولیدیشن rules
  error?: string;
}

export default function InputForm<T extends FieldValues>({
  label,
  placeholder,
  type = "text",
  name,
  register,
  rules,
  error,
}: TInput<T>) {
  return (
    <div className="flex flex-col gap-y-2 rtl">
      <span className="text-xl text-gray-600">{label}</span>
      <div className="border border-gray-200 rounded-xl w-full px-4 py-4 text-gray-700 text-xl">
        <input
          type={type}
          placeholder={placeholder}
          className="placeholder:text-gray-400 placeholder:text-lg w-full rtl outline-none"
          {...register(name, rules)}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
