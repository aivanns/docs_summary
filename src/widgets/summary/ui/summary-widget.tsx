import { Summary } from "@/features/summary/ui";
import SummaryHeader from "@/features/summary/ui/summary-header";

const SummaryWidget = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <SummaryHeader />
      <Summary className="flex-1" />
    </div>
  );
};

export default SummaryWidget;
