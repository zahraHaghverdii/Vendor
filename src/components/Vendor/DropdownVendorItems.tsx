import { Call, Location, MoreCircle } from "iconsax-react";
import Dropdown from "../../context/DropdownItemsContext";
import { Link } from "react-router";
import useIdVendorFetch from "../../hooks/useIdVendorFetch";
import { useShowLocationMapStore } from "../../store/useShowLocationMapStore";
import ButtonDeleteVendor from "../ui/ButtonDeleteVendor";
import ButtonEditVendor from "../ui/ButtonEditVendor";

interface TDropdownVendorItems {
  id: number;
}

export default function DropdownVendorItems({ id }: TDropdownVendorItems) {
  const { VendorId } = useIdVendorFetch(id);
  const { setLocation, setLocationId } = useShowLocationMapStore();

  // set and get locaion
  const handleSetLocation = ({
    lat,
    lng,
    id,
  }: {
    lat: number | null;
    lng: number | null;
    id: number | null;
  }) => {
    setLocationId(id);
    setLocation({ lat: lat, lng: lng });
  };

  return (
    <>
      <Dropdown.OpenDropdown opens={id}>
        <span className="p-2 rounded-full cursor-pointer">
          <MoreCircle color="#bbb" size={20} />
        </span>
      </Dropdown.OpenDropdown>

      <Dropdown.WindowDropdown id={id}>
        <div className="flex flex-col gap-y-7">
          {/* edite */}
          <ButtonEditVendor openId={id} />

          {/* delete */}
          <ButtonDeleteVendor openId={id} />

          {/* tel */}
          <Link
            to={`tel:${VendorId?.phone}`}
            className="flex gap-x-3 items-center cursor-pointer"
          >
            <Call size={20} color="#aaa" />
            <span
              className="text-gray-600 text-2xl"
              onClick={() => console.log(VendorId?.phone)}
            >
              تماس
            </span>
          </Link>

          {/* location */}
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() =>
              handleSetLocation({
                lat: VendorId?.location?.lat ?? null,
                lng: VendorId?.location?.lng ?? null,
                id: VendorId?.id ?? null,
              })
            }
          >
            <Location size={20} color="#aaa" />
            <span className="text-gray-600 text-2xl">نقشه</span>
          </div>
        </div>
      </Dropdown.WindowDropdown>
    </>
  );
}
