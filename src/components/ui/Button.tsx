import type { ReactNode } from "react";

interface TButton {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: TButton) {
  return (
    <div
      role="button"
      onClick={() => onClick()}
      className={`${className} px-7 py-3 rounded-lg text-center cursor-pointer`}
    >
      {children}
    </div>
  );
}
