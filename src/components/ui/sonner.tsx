
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  Check,
  Info,
  X,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      icons={{
        success: (
          <Check className="size-5 shrink-0 text-emerald-500 stroke-2" />
        ),
        info: (
          <Info className="size-5 shrink-0 text-neutral-700 dark:text-neutral-300" />
        ),
        error: (
          <X className="size-5 shrink-0 text-red-500 stroke-2" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "10px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast !flex !items-center !gap-3 !rounded-[10px] !border !px-3.5 !py-3 !font-sans !shadow-[0_2px_8px_rgba(0,0,0,0.10)]",

          icon: "!flex !shrink-0 !items-center !justify-center",

          content: "!flex-1 !min-w-0",

          title: "!text-sm !font-medium",

          description: "!text-sm",

          closeButton:
            "!absolute  !right-3 !left-auto !top-1/2 !-translate-y-1/2 !rounded-full !border-0 !bg-transparent !p-1 !text-neutral-500 hover:!bg-black/5 dark:!text-neutral-400 dark:hover:!bg-white/10",

          info:
            "!border-neutral-200 !bg-[#f4f4f5] !text-neutral-900 dark:!border-zinc-800 dark:!bg-[#18181b] dark:!text-white",

          success:
            "!border-emerald-100 !bg-[#ecfdf5] !text-neutral-900 dark:!border-emerald-950 !bg-[#064e3b] !text-emerald-50",

          error:
            "!border-red-100 !bg-[#fef2f2] !text-neutral-900 dark:!border-red-950 dark:!bg-[#451a1a] dark:!text-red-50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
