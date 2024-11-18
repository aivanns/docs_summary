"use client";

import Link from "next/link";
import { REGISTER } from "@/shared/router/routes";
import { useTranslations } from "@/shared/hooks/use-translations";
import { AuthForm } from "@/features/auth/ui/auth-form";

export function AuthFormWidget() {
  const t = useTranslations();

  return (
    <div className="w-[460px] relative z-10">
      <div className="bg-slate-100 space-y-6 dark:bg-[#17181C] backdrop-blur-xl rounded-2xl m-2 p-8 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-[28px] font-bold text-black dark:text-white">
            {t.auth.title}
          </h1>
          <p className="text-[15px] text-[#6C7281]">{t.auth.description}</p>
        </div>
        <AuthForm />

        <div className="mt-4 flex items-center justify-between text-[15px]">
          <span className="text-[#6C7281] text-sm">{t.auth.noAccount}</span>
          <Link
            href={REGISTER}
            className="text-primary font-bold hover:text-primary-hover transition-colors"
          >
            {t.auth.register}
          </Link>
        </div>
      </div>
    </div>
  );
}
