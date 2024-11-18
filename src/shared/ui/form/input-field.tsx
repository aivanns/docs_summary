import { Controller, FieldValues } from "react-hook-form";
import { BaseInputField } from "../input/base-input-field";
import { ControlledInputFieldProps } from "@/shared/types/form";

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledInputFieldProps<T>) {
  return (
    <div className="space-y-2.5 mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <BaseInputField
            {...field}
            {...props}
            label={label}
            error={error?.message}
          />
        )}
      />
      {props.error && (
        <p className="text-[13px] text-red-500 mt-1">{props.error[0]}</p>
      )}
    </div>
  );
}
