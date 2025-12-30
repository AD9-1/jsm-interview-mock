import { z } from "zod";
export const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must of least 2 characters")
    .max(50, "Username must be at most 50 characters"),
});

export type AuthFormData = z.infer<typeof formSchema>;
