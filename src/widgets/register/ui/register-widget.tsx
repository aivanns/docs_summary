"use client";

import Link from "next/link";
import { RegisterForm } from "@/features/register";
import { AUTH } from "@/shared/router/routes";
import { useTranslations } from "@/shared/hooks/use-translations";

export const RegisterWidget = () => {
  const t = useTranslations();
  return (
    <div className="w-[460px] relative z-10">

      <div className="bg-slate-100  dark:bg-[#17181C] backdrop-blur-xl rounded-2xl m-2 p-8 shadow-xl">
        <RegisterForm />

        <div className="mt-6 flex items-center justify-between text-[15px]">
          <span className="text-[#6C7281]">{t.auth.haveAccount}</span>
          <Link
            href={AUTH}
            className="text-primary font-bold hover:text-primary-hover transition-colors"
          >
            {t.auth.auth}
          </Link>
        </div>
      </div>
    </div>
  );
};
