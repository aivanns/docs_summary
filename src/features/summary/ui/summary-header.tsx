"use client";

import { cn } from "@/shared/utils/lib/cn";
import { useEffect, useState } from "react";
import { SummaryApi } from "../api/summary-api";
import { TbSum } from "react-icons/tb";
import { Button, Tooltip } from "antd";
import { LogOut } from "lucide-react";
import { useSessionStore } from "@/entities/session";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useRouter } from "next/navigation";
import { AUTH } from "@/shared/router/routes";

const SummaryHeader = ({ className }: { className?: string }) => {
  const [username, setUsername] = useState<string | null>(null);
  const { logout } = useSessionStore();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    SummaryApi.getSelf()
      .then((data) => setUsername(data.data.username))
      .catch(() => setUsername(null));
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push(AUTH);
  };

  return <div className={cn(
    "flex justify-between items-center",
    "bg-primary dark:bg-dark-surface",
    "w-full",
    "px-8 py-4",
    "shadow-sm",
    "transition-colors duration-200",
    className
    )}
  >
    <div className="flex items-center gap-1">
      <TbSum size={28} className="text-white"/>
      <div className="text-lg font-bold text-white dark:text-white">Summarize It</div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-white/80 dark:text-gray-400 font-medium">{username}</div>
      <Tooltip title={t.summary.logout.tooltip}>
        <Button 
          onClick={handleLogout}
          type="text" 
          icon={<LogOut size={18} />}
          className={cn(
            "flex items-center gap-2",
            "text-white/80 hover:text-white",
            "dark:text-gray-400 dark:hover:text-white",
            "font-medium",
            "transition-all duration-200",
            "hover:scale-105",
            "hover:bg-white/10",
            "dark:hover:bg-gray-800"
          )}
        >
          {t.summary.logout.button}
        </Button>
      </Tooltip>
    </div>
  </div>;
};

export default SummaryHeader;
