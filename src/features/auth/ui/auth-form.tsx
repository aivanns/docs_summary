"use client";

import { AuthFormData, createAuthSchema } from "../types";
import { Button, App } from "antd";
import { useAuth } from "../model/use-auth";
import { useTranslations } from "@/shared/hooks/use-translations";
import { InputTypes } from "@/shared/enums/input";
import { Form } from "@/shared/ui/form/form";

export function AuthForm() {
  const { login } = useAuth();
  const { message } = App.useApp();
  const t = useTranslations();

  const authSchema = createAuthSchema(t);

  const fields = [
    {
      name: "email",
      label: t.auth.form.email,
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: t.auth.form.password,
      type: InputTypes.PASSWORD,
      required: true,
    },
  ];

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await login(data);
      message.success(t.auth.messages.success);
    } catch (error: unknown) {
      console.error(error);
      message.error(t.auth.messages.error);
    }
  };

  return (
    <div className="space-y-6">
      <Form<AuthFormData>
        fields={fields}
        schema={authSchema}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-full  bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-md"
          block
        >
          {t.auth.title}
        </Button>
      </Form>
    </div>
  );
}
