
import * as React from "react";
import { cn } from "cn";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "peer w-full min-h-37.5 max-h-80 resize-y rounded-lg border px-2.5 py-2 text-sm",

        // Light mode
        "bg-white text-zinc-900 placeholder:text-zinc-400",
        "border-zinc-300",

        // Transition
        "transition-colors duration-200 outline-none",

        // Hover
        "hover:border-zinc-400",

        // Focus
        "focus-visible:border-[#ffa3b9]",
        "focus-visible:ring-2 focus-visible:ring-[#ffa3b9]/20",

        // Error
        "aria-invalid:border-red-500",
        "aria-invalid:focus-visible:ring-red-500/20",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:bg-zinc-100",
        "disabled:border-zinc-200",
        "disabled:text-zinc-400",
        "disabled:placeholder:text-zinc-400",

        // Dark mode
        "dark:bg-[#3f3f46] dark:text-white",
        "dark:placeholder:text-[#85858f]",
        "dark:border-[#52525b]",
        "dark:hover:border-[#71717a]",
        "dark:disabled:bg-[#18181b]",
        "dark:disabled:border-[#18181b]",
        "dark:disabled:text-[#71717a]",
        "dark:disabled:placeholder:text-[#52525b]",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
