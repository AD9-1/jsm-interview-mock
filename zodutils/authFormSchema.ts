import { z } from "zod";
export const AuthformSchema = ({type}:{type: "sign-in" | "sign-up"}) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};

export type AuthFormData = z.infer<ReturnType<typeof AuthformSchema>>;
