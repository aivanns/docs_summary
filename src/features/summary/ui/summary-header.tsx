import { cn } from "@/shared/utils/lib/cn";

const SummaryHeader = ({ className }: { className?: string }) => {
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
    <div className="text-lg font-bold text-white dark:text-white">Summarize It</div>
    <div className="text-white/80 dark:text-gray-400">Username</div>
  </div>;
};

export default SummaryHeader;
