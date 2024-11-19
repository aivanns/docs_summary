"use client";

import { cn } from "@/shared/utils/lib/cn";
import { Button, Input, ConfigProvider } from "antd";
import { useState } from "react";
import { Upload } from "lucide-react";

export const Summary = ({ className }: { className?: string }) => {
  const { TextArea } = Input;
  const [text, setText] = useState("");
  
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
              onClick={() => {}}
            >
              <span className="ml-2 font-medium">Загрузить файл</span>
            </Button>
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
              onClick={() => {}}
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
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-gray-100">
            Результат
          </h3>
          <div className="text-slate-600 dark:text-gray-400 min-h-[100px]">
            {text ? "Здесь будет отображаться результат суммаризации..." : 
              <div className="flex items-center justify-center h-[100px] text-slate-400 dark:text-gray-500">
                Введите текст для суммаризации
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};