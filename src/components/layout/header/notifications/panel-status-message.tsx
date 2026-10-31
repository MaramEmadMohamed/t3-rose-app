import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PanelStatusMessageProps = {
  role: "status" | "alert";
  className?: string;
  children: ReactNode;
};

// One line of text in the panel body, used for the loading and error states.
export function PanelStatusMessage({ role, className, children }: PanelStatusMessageProps) {
  return (
    <p role={role} className={cn("border-t border-soft p-4 text-sm", className)}>
      {children}
    </p>
  );
}
