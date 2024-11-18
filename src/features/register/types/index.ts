import { z } from "zod";
import { ValidationMessages } from "@/shared/types/common";

export const createRegisterSchema = (messages: ValidationMessages) =>
  z.object({
    username: z.string().min(4, messages.validation.required),
    password: z.string().min(6, messages.validation.password),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
