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
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/65">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="h-14 rounded-full border-primary/15 bg-white/80 px-5 text-base text-foreground placeholder:text-foreground/40 focus-visible:border-primary/25 focus-visible:ring-primary/25"
                placeholder={placeholder}
                type={type === "password" ? (showPass ? "password" : "text") : type}
                {...field}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/45 transition hover:text-foreground/75"
                >
                  {showPass ? <EyeClosed /> : <EyeIcon />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-sm" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
