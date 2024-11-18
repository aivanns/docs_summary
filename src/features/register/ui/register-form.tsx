"use client";

import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../model/use-register";
import { Button, App } from "antd";
import { Form } from "@/shared/ui/form/form";
import { useTranslations } from "@/shared/hooks/use-translations";
import { createRegisterSchema } from "../types";
import { RegisterFormData } from "../types";

export function RegisterForm() {
  const { register } = useRegister();
  const { message } = App.useApp();
  const t = useTranslations();

  const fields = [
    {
      name: "email",
      label: t.register.form.email,
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: t.register.form.password,
      type: InputTypes.PASSWORD,
      required: true,
    },
    {
      name: "phone",
      label: t.register.form.phone,
      type: InputTypes.PHONE,
      required: true,
    },
  ];

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      message.success(t.register.messages.success);
    } catch (error: unknown) {
      console.error(error);
      message.error(t.register.messages.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[28px] font-bold text-black dark:text-white">
          {t.register.title}
        </h1>
        <p className="text-[15px] text-[#6C7281]">{t.register.description}</p>
      </div>

      <Form<RegisterFormData>
        fields={fields}
        schema={createRegisterSchema(t)}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-md mt-2"
          block
        >
          {t.register.title}
        </Button>
      </Form>
    </div>
  );
}
