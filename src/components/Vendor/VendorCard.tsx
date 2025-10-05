import { Link } from "react-router";
import type { Vendors } from "../../types/Vendors";
import DropdownVendorItems from "./DropdownVendorItems";

export default function VendorCard({
  companyName,
  manager,
  phone,
  logo,
  id,
}: Vendors) {
  return (
    <div
      key={id}
      className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition my-5 relative"
    >
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={companyName}
          className="md:w-16 md:h-16 w-14 h-14 rounded-lg object-contain "
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="md:text-2xl text-base font-bold text-gray-800">
            {companyName}
          </h3>
          <p className="md:text-xl text-sm text-gray-600">مسئول: {manager}</p>
          <p className="md:text-xl text-sm text-gray-500">
            تماس: <Link to={`tel:${phone}`}>{phone}</Link>
          </p>
        </div>
      </div>

      <DropdownVendorItems id={id} />
    </div>
  );
}
