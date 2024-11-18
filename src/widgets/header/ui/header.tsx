"use client";

import { LanguageSwitcher } from "@/features/language";

export function Header() {
  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <LanguageSwitcher />
    </header>
  );
} 