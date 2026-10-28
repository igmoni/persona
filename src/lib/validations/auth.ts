import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, "Enter your email or username"),
  password: passwordSchema,
});

export const signupSchema = z.object({
  identifier: z.email("Enter a valid email address"),
  password: passwordSchema,
});

export type AuthFormValues = z.infer<typeof loginSchema>;
