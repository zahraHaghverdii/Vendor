import VendorList from "../components/Vendor/VendorList";
import MapView from "../components/Vendor/MapView";
import ModalVendor from "../components/ui/ModalVendor";

export default function Vendor() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-0 gap-x-0 gap-y-4 p-6">
      {/* Map section */}
      <MapView />

      {/* Vendor List */}
      <VendorList />

      {/* modal add/edite */}
      <ModalVendor />
    </div>
  );
}
