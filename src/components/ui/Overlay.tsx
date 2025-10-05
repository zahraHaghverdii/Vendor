import { useVendorModalStor } from "../../store/useVendorModalStor";

export default function Overlay() {
  const { closeModal, isOpen } = useVendorModalStor();
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-500 opacity-50 z-40 transform transition-transform duration-500"
      onClick={() => closeModal()}
    ></div>
  );
}
