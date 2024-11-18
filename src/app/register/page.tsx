import { Metadata } from "next";
import { RegisterWidget } from "@/widgets/register/ui/register-widget";
import { RegisterMetadata } from "@/shared/enums/metadata";
import { AuthBackground } from "@/shared/ui/background/auth-background";

export const metadata: Metadata = {
  title: RegisterMetadata.TITLE,
  description: RegisterMetadata.DESCRIPTION,
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <AuthBackground />

      <RegisterWidget />
    </div>
  );
}
