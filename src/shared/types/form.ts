import { ReactNode } from "react";
import { InputTypes } from "../enums/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

export interface InputFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type?: InputTypes;
  required?: boolean;
}

export interface FormProps<T extends Record<string, unknown>> {
  fields: FormField[];
  schema: z.ZodType<T>;
  onSubmit: (data: T) => void;
  children?: ReactNode;
}

export interface ControlledInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, "value" | "onChange" | "onBlur"> {
  control: Control<T>;
  name: Path<T>;
}
