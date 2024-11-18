"use client";

import { Button } from "antd";
import { useSessionStore } from "@/entities/session";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { logout } = useSessionStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
