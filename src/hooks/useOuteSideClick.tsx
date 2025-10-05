import { useEffect, useRef } from "react";

interface TOuteSide {
  close: () => void;
  isOpen: boolean;
}

export default function useOutsideClick({ close, isOpen }: TOuteSide) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (ref.current && !ref.current.contains(target)) {
        close();
      }
    };

    // استفاده از pointerdown -> پوشش بهتر برای ماوس و تاچ
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [close, isOpen]);

  return ref;
}
