"use client";

import { cn } from "@/shared/utils/lib/cn";
import { Button, Input, Spin } from "antd";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useSocketContext } from '@/shared/providers/socket-provider';
import { SummaryApi } from "../api/summary-api";

export const Summary = ({ className }: { className?: string }) => {
  const { TextArea } = Input;
  const [text, setText] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emit, on, off } = useSocketContext();

  useEffect(() => {
    const handleSummary = (data: any) => {
      if (typeof data === 'string') {
        setSummary(data);
      } else if (data && typeof data.summary === 'string') {
        setSummary(data.summary);
      }
      setIsLoading(false);
      setPosition(null);
    };

    const handlePosition = (data: any) => {
      setPosition(data.position);
    };

    const handleError = (data: any) => {
      setIsLoading(false);
      setPosition(null);
    };

    on('summary', handleSummary);
    on('position', handlePosition);
    on('error', handleError);

    return () => {
      off('summary');
      off('position');
      off('error');
    };
  }, [on, off]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleSummarize = () => {
    if (!text.trim()) return;
    
    setSummary("");
    setPosition(0);
    setIsLoading(true);

    SummaryApi.summarize(text)
      .catch(() => {
        setIsLoading(false);
        setPosition(null);
      });
  };

  return (
    <div className={cn(
      "flex flex-col items-center",
      "bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-lighter",
      "w-full h-full",
      "px-8 md:px-24 py-12",
      "transition-all duration-300",
      className
    )}>
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-6">
          <div className="flex flex-col gap-4 md:w-[220px]">
            <Button 
              type="primary" 
              size="large"
              icon={<Upload size={18} />}
              className={cn(
                "h-auto py-4 px-6",
                "!bg-primary hover:!bg-primary-hover",
                "dark:!bg-dark-purple dark:hover:!bg-dark-purple-hover",
                "rounded-xl",
                "shadow-md hover:shadow-lg",
                "transform hover:scale-[1.02]",
                "transition-all duration-200"
              )}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <span className="ml-2 font-medium">Загрузить файл</span>
            </Button>
            <input
              id="fileInput"
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              type="primary"
              size="large"
              className={cn(
                "h-auto py-4",
                "!bg-primary hover:!bg-primary-hover",
                "dark:!bg-dark-purple dark:hover:!bg-dark-purple-hover", 
                "rounded-xl",
                "shadow-md hover:shadow-lg",
                "transform hover:scale-[1.02]",
                "transition-all duration-200"
              )}
              onClick={handleSummarize}
            >
              <span className="font-medium">Суммаризировать</span>
            </Button>
          </div>
            <div className="flex-1">
              <TextArea
                placeholder="Введите или вставьте текст здесь..."
                autoSize={{ minRows: 12, maxRows: 16 }}
                className={cn(
                  "flex-1 resize-none",
                  "rounded-xl",
                  "shadow-lg",
                  "border-2",
                  "dark:!bg-[#17181C] dark:!border-gray-800",
                  "hover:border-primary focus:border-primary",
                  "dark:hover:!border-dark-purple dark:focus:!border-dark-purple",
                  "focus:!shadow-[0_0_0_2px_rgba(0,193,160,0.2)]",
                  "dark:focus:!shadow-[0_0_0_2px_rgba(107,78,255,0.2)]",
                  "transition-all duration-200"
                )}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        
        <div className={cn(
          "w-full rounded-xl p-8",
          "bg-white dark:bg-[#17181C]",
          "border border-slate-200 dark:border-gray-800",
          "shadow-md",
          "transition-all duration-200"
        )}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
              Результат
            </h3>
          </div>
          
          <div className="text-slate-600 dark:text-gray-400 min-h-[100px]">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spin />
              </div>
            ) : summary && summary.length > 0 ? (
              <div className="whitespace-pre-wrap">
                {summary}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px] text-slate-400 dark:text-gray-500">
                Введите текст для суммаризации
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <span className="loader" />
          {position !== null && (
            <span className="ml-2 mt-2 text-sm text-slate-500 dark:text-gray-400">
              Ваша позиция в очереди: {position}
            </span>
          )}
        </div>
      )}
    </div>
  );
};