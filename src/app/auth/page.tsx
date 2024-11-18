import { AuthMetadata } from "@/shared/enums/metadata";
import { AuthBackground } from "@/shared/ui/background/auth-background";
import { AuthFormWidget } from "@/widgets/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: AuthMetadata.TITLE,
  description: AuthMetadata.DESCRIPTION,
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0B] relative overflow-hidden">
      <AuthBackground />

      <AuthFormWidget />
    </div>
  );
}
