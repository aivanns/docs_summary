import { z } from "zod";
import { ValidationMessages } from "@/shared/types/common";

export const createRegisterSchema = (messages: ValidationMessages) =>
  z.object({
    email: z.string().email(messages.validation.email),
    password: z.string().min(6, messages.validation.password),
    phone: z.string().min(1, messages.validation.required),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
