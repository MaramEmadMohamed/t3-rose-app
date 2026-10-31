import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";

// Shared by every clickable item in the top bar (Login, icons, language).
export const HEADER_CONTROL_CLASS_NAME = `rounded-md transition-colors hover:text-primary-saturated ${FOCUS_RING_CLASS_NAME}`;

export const HEADER_DIVIDER_CLASS_NAME = "border-s border-muted";

export const LOGIN_INPUT_CLASS_NAME = `h-12 w-full rounded-xl border border-soft bg-plain px-4 text-plain placeholder:text-muted focus:border-default ${FOCUS_RING_CLASS_NAME}`;
