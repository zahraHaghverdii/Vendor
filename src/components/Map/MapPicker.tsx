import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useShowLocationMapStore } from "../../store/useShowLocationMapStore";
import { useEffect, useState } from "react";
import useIdVendorFetch from "../../hooks/useIdVendorFetch";

// یک کامپوننت داخلی برای تغییر مرکز نقشه وقتی location عوض میشه
function ChangeMapView({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position[0] && position[1]) {
      map.setView(position, 13); // center رو تغییر میده
    }
  }, [position, map]);

  return null;
}

export default function MapPicker() {
  const { location, id } = useShowLocationMapStore();
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]); // مقدار اولیه تهران

  const { VendorId } = useIdVendorFetch(id);

  useEffect(() => {
    if (location.lat && location.lng) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {VendorId?.companyName ? (
            <div className="rlt text-xl">
              <p>شرکت: {VendorId?.companyName}</p>
              <p>مدیر: {VendorId?.manager}</p>
            </div>
          ) : (
            <p className=" text-xl">شرکت مد نظر را انتخاب کنید</p>
          )}
        </Popup>
      </Marker>

      {/* اینجا نقشه رو با تغییر موقعیت آپدیت می‌کنیم */}
      <ChangeMapView position={position} />
    </MapContainer>
  );
}
