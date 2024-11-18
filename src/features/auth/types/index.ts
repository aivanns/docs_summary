import { z } from "zod";
import { ValidationMessages } from "@/shared/types/common";

export const createAuthSchema = (messages: ValidationMessages) =>
  z.object({
    email: z.string().email(messages.validation.email),
    password: z.string().min(6, messages.validation.password),
  });

export type AuthFormData = z.infer<ReturnType<typeof createAuthSchema>>;

export interface AuthState {
  isLoading: boolean;
  error: Error | null;
  login: (credentials: AuthFormData) => Promise<void>;
  register: (data: AuthFormData) => Promise<void>;
} 