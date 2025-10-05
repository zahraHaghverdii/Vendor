import { useVendorModalStor } from "../../store/useVendorModalStor";

import ModalAddAndEdite from "./ModalAddAndEdite";
import ModalDelete from "./ModalDelete";

export default function ModalVendor() {
  const { isOpen, mode } = useVendorModalStor();

  if (!isOpen) return null;

  return mode === "delete" ? <ModalDelete /> : <ModalAddAndEdite />;
}
