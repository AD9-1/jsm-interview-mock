import React, { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { EyeClosed, EyeIcon } from "lucide-react";
interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="ml-7 text-xl">{label}</FormLabel>
          <FormControl>
            <div className="relative ml-5 w-3/4 ">
              <Input
                className="rounded-4xl py-6 border border-amber-950  placeholder:text-gray-700 focus:outline-none
                focus:border-0
                focus:ring-1 focus:ring-[#0f0b65]"
                placeholder={placeholder}
                type={showPass ? "password" : ""}
                {...field}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 translate-y-1/2 text-gray-500"
                >
                  {showPass ? <EyeClosed /> : <EyeIcon />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
