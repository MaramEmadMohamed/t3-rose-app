"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex data-horizontal:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  [
    "flex min-w-[294px] min-h-[44px] items-stretch",
    "overflow-hidden rounded-[10px] border-2 p-0",
    "border-border bg-white",
    "dark:border-border dark:bg-bg-border",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        line: [
          "border-transparent bg-transparent",
          "dark:border-transparent dark:bg-transparent",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        [
          "relative flex h-11 flex-1 items-center justify-center",
          "rounded-none border-0 px-4 py-3.5",
          "text-[16px] font-medium transition-colors",
          "bg-white text-foreground",
          "hover:bg-[rgb(245,233,234)] hover:cursor-pointer",
          "data-active:bg-[#50151a] data-active:text-white",
          "focus-visible:outline-none focus-visible:ring-2",
          "data-active:hover:bg-[#50151a]",
          "focus-visible:ring-inset focus-visible:ring-[#50151a]",
          "disabled:pointer-events-none disabled:opacity-40",

          "dark:bg-[#18181b] dark:text-[rgb(228,228,231)]",
          "dark:hover:bg-[#3f3f46] dark:data-active:hover:bg-[rgba(255,194,208,1)]",
          "dark:data-active:bg-[rgba(255,163,185,1)]",
          "dark:data-active:text-foreground",
          "dark:focus-visible:ring-destructive",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "mt-2 flex-1 text-sm text-[#292929] outline-none",
        "dark:text-[#e4e4e7]",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
