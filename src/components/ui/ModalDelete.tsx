import useDeleteVendorFetch from "../../hooks/useDeleteVendorFetch";
import useIdVendorFetch from "../../hooks/useIdVendorFetch";
import useOutsideClick from "../../hooks/useOuteSideClick";
import { useVendorModalStor } from "../../store/useVendorModalStor";
import Button from "./Button";
import SpinnerBtn from "./SpinnerBtn";

export default function ModalDelete() {
  const { isOpen, vendorId, closeModal } = useVendorModalStor();
  const { VendorId } = useIdVendorFetch(vendorId);
  const { deleteVendor, isPending } = useDeleteVendorFetch(VendorId?.id);
  const ref = useOutsideClick({ close: closeModal, isOpen });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 rtl"
      onClick={closeModal} // ← کلیک روی پس‌زمینه
    >
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()} // ← کلیک روی مودال اینجا متوقف میشه
        className="bg-white md:w-1/3 w-11/12 rounded-xl shadow-md border border-gray-300 px-4 py-8"
      >
        <h2 className="text-3xl font-bold mb-5">آیا مطمئنی؟</h2>
        <p className="mt-2 text-2xl text-gray-600">
          میخوای شرکت <b> {VendorId?.companyName} </b> با مدیریت
          <b>{VendorId?.manager}</b> را حذف کنی؟
        </p>
        <div className="flex justify-end gap-3 mt-16">
          <Button onClick={closeModal} className="bg-gray-200">
            انصراف
          </Button>
          <Button
            onClick={() => {
              deleteVendor();
              closeModal();
            }}
            className=" bg-red-500 text-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <SpinnerBtn /> : "حذف"}
          </Button>
        </div>
      </div>
    </div>
  );
}
