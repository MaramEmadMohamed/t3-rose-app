import { useEffect, useEffectEvent, type RefObject } from "react";

type UseDismissOptions = {
  ref: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onDismiss: () => void;
};

// Closes a popup when the user clicks outside it or presses Escape.
export function useDismiss({ ref, isOpen, onDismiss }: UseDismissOptions) {
  // Reads the latest onDismiss without re-subscribing on every render.
  const dismiss = useEffectEvent(onDismiss);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) dismiss();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, isOpen]);
}
