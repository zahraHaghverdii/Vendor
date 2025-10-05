import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../hooks/useOuteSideClick";

// ---------- 1) کانتکست ----------
interface DropdownContextType {
  openId: number | null;
  toggle: (id: number) => void;
  close: () => void;
}
const DropdownContext = createContext<DropdownContextType | null>(null);

// ---------- 2) Provider ----------
function Dropdown({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const close = () => setOpenId(null);

  return (
    <DropdownContext.Provider value={{ openId, toggle, close }}>
      {children}
    </DropdownContext.Provider>
  );
}

// ---------- 3) OpenDropdown ----------
interface OpenDropdownProps {
  children: ReactElement | ReactNode;
  opens: number;
  className?: string;
}
function OpenDropdown({ children, opens, className }: OpenDropdownProps) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("OpenDropdown must be used inside Dropdown");
  const { toggle } = context;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    toggle(opens);
  };

  return (
    <div role="button" onPointerDown={handlePointerDown} className={className}>
      {children}
    </div>
  );
}

// ---------- 4) OpenDropdown ----------
interface CloseDropdownProps {
  children: ReactElement | ReactNode;
  className?: string;
}
function CloseDropdown({ children, className }: CloseDropdownProps) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("OpenDropdown must be used inside Dropdown");
  const { close } = context;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    close();
  };

  return (
    <div role="button" onPointerDown={handlePointerDown} className={className}>
      {children}
    </div>
  );
}

// ---------- 5) WindowDropdown ----------
interface WindowDropdownProps {
  children: ReactNode;
  id: number;
  className?: string;
}

function WindowDropdown({ children, id, className }: WindowDropdownProps) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("WindowDropdown must be used inside Dropdown");

  const { openId, close } = context;
  const isOpen = openId === id;

  const ref = useOutsideClick({ close, isOpen });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className={
            className ??
            "absolute top-[60px] left-0 z-10 md:w-[40%] w-[30%] bg-[#f1f1f1] rounded-xl shadow-md border border-gray-300 p-4"
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- 6) اتصال به Dropdown ----------
Dropdown.OpenDropdown = OpenDropdown;
Dropdown.CloseDropdown = CloseDropdown;
Dropdown.WindowDropdown = WindowDropdown;

export default Dropdown;
