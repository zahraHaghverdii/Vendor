import { CloseCircle } from "iconsax-react";
import type { Vendors } from "../../types/Vendors";
import Button from "./Button";
import InputForm from "./InputForm";
import Overlay from "./Overlay";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useVendorModalStor } from "../../store/useVendorModalStor";
import useAddVendor from "../../hooks/useAddVendor";
import useEditVendorFetch from "../../hooks/useEditVendorFetch";
import useIdVendorFetch from "../../hooks/useIdVendorFetch";
import SpinnerBtn from "./SpinnerBtn";
import InputImage from "./InputImage";
import GetMapInput from "../Map/GetMapInput";

export default function ModalAddAndEdite() {
  const { mode, closeModal, vendorId } = useVendorModalStor();
  const { VendorId } = useIdVendorFetch(vendorId);

  const { addVendor, isPending } = useAddVendor();
  const { editVendor, isPending: isPendingEdit } = useEditVendorFetch(
    VendorId?.id
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Vendors>({
    mode: "onSubmit",
    defaultValues: {
      address: "",
      companyName: "",
      manager: "",
      phone: "",
      logo: "",
      location: { lat: 35.6892, lng: 51.389 },
    },
  });

  // loading
  const isLoading = VendorId?.id ? isPendingEdit : isPending;

  // وقتی VendorId تغییر کرد => فرم رو دوباره مقداردهی کن
  useEffect(() => {
    if (mode === "edit" && VendorId?.id) {
      reset({
        companyName: VendorId?.companyName,
        manager: VendorId?.manager,
        address: VendorId?.address,
        phone: VendorId?.phone,
        logo: VendorId?.logo,
        location: VendorId?.location ?? { lat: 0, lng: 0 },
      });
    } else if (mode === "add") {
      reset({
        companyName: "",
        manager: "",
        address: "",
        phone: "",
        logo: "",
        location: { lat: 35.6892, lng: 51.389 },
      });
    }
  }, [VendorId, mode, reset]);

  // onSubmit
  function onSubmit(data: Vendors) {
    if (mode === "add") {
      addVendor(data, {
        onSuccess: () => {
          reset();
          closeModal();
        },
      });
    } else {
      editVendor(data, {
        onSuccess: () => {
          reset(data);
          closeModal();
        },
      });
    }
  }

  return (
    <>
      <Overlay />
      <div className="md:w-1/2 w-11/12 md:h-9/11 h-11/12 flex flex-col gap-y-8 bg-[#fff] rounded-xl shadow-md border border-gray-300 px-4 py-8 absolute inset-0 m-auto z-50">
        <div className="flex justify-between items-center">
          <span className="cursor-pointer" onClick={closeModal}>
            <CloseCircle size={20} color="#bbb" />
          </span>
          <div className="w-full text-center text-gray-700 font-bold text-2xl">
            {mode === "add" ? "افزودن فروشنده" : "ویرایش فروشنده"}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 h-auto overflow-y-auto scrollbar-style"
        >
          <InputForm<Vendors>
            label="نام برند"
            placeholder="نام برند را وارد کنید"
            type="text"
            name="companyName"
            register={register}
            rules={{
              required: "نام برند الزامی است",
              minLength: {
                value: 2,
                message: "نام برند باید حداقل 2 کاراکتر باشد",
              },
            }}
            error={errors.companyName?.message}
          />

          <InputForm<Vendors>
            label="نام مسئول"
            placeholder="نام مسئول برند را وارد کنید"
            name="manager"
            register={register}
            rules={{
              required: "نام مسئول الزامی است",
              minLength: {
                value: 3,
                message: "نام مسئول باید حداقل 3 کاراکتر باشد",
              },
            }}
            error={errors.manager?.message}
          />

          {/* لوگو */}
          <InputImage<Vendors>
            label="لوگو برند"
            name="logo"
            control={control}
            rules={{ required: "لوگو الزامی است" }}
            error={errors.logo?.message}
            initialPreview={VendorId?.logo || null}
          />

          <InputForm<Vendors>
            label="شماره تماس"
            placeholder="شماره تماس شرکت را وارد کنید"
            type="tel"
            name="phone"
            register={register}
            rules={{
              required: "شماره تماس الزامی است",
              pattern: {
                value: /^(\+98|0)?9\d{9}$/,
                message: "شماره تلفن وارد شده معتبر نیست",
              },
            }}
            error={errors.phone?.message}
          />

          {/* نقشه متصل به فرم */}
          <Controller
            control={control}
            name="location"
            defaultValue={{ lat: 35.6892, lng: 51.389 }}
            rules={{
              validate: (val) =>
                val && val.lat !== 0 && val.lng !== 0
                  ? true
                  : "انتخاب موقعیت الزامی است",
            }}
            render={({ field, fieldState }) => (
              <>
                <GetMapInput
                  value={field.value} //مقدار lat,lng و در بر میگیره که از فرم و نقشه میاد
                  onChange={(loc) => {
                    //میاد اون تغییراتی که اعمال کردیم و به کمک react-hook-form به سرور ارسال میکنه
                    field.onChange(loc); //این خط میاد مقدار جدید lat,lng و با توجه به موقعیت جدید که ست شده تغییر میده
                    setValue("location", loc);
                  }}
                  initialAddress={VendorId?.address ?? ""} //مقدار اولیه آدرس در input و بررسی میکنه
                  onAddressChange={(addr) => {
                    // وقتی آدرس متنی تغییر کرد، فیلد address فرم رو بروز کن
                    setValue("address", addr, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />

          {/* btn */}
          <div className="flex justify-start items-center gap-x-5 mt-11">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-300 px-7 py-3 rounded-lg text-center cursor-pointer w-1/2 disabled:opacity-50"
            >
              {isLoading ? (
                <SpinnerBtn />
              ) : mode === "add" ? (
                "افزودن"
              ) : (
                "ویرایش"
              )}
            </button>

            <Button onClick={closeModal} className="bg-gray-200 w-1/2">
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
