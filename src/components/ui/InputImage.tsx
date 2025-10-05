import {
  type RegisterOptions,
  type FieldValues,
  type Path,
  type Control,
  Controller,
} from "react-hook-form";
import { useState } from "react";

interface TInputFile<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>; // برای Controller
  rules?: RegisterOptions<T, Path<T>>;
  error?: string;
  initialPreview?: string | null; // عکس اولیه در حالت edit
}

export default function InputImage<T extends FieldValues>({
  label,
  name,
  control,
  rules,
  error,
  initialPreview,
}: TInputFile<T>) {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);

  return (
    <div className="flex flex-col gap-y-2 rtl">
      <span className="text-xl text-gray-600">{label}</span>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  setPreview(base64); // پیش نمایش
                  field.onChange(base64); // مقدار فرم
                };
                reader.readAsDataURL(file);
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 w-28 h-28 object-cover rounded-md"
              />
            )}
          </>
        )}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
