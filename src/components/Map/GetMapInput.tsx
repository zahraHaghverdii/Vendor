import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { geocodeAddress } from "../../services/geocodeAddress";

type Location = { lat: number; lng: number };

interface GetMapInputProps {
  value?: Location | null; // از فرم میاد (ممکنه undefined یا null باشه)
  onChange: (loc: Location) => void; // برای ست کردن موقعیت در فرم
  initialAddress?: string; //  آدرسی که از قبل توی فرم هست
  onAddressChange?: (addr: string) => void; // برای ست کردن فیلد متنِ آدرس داخل فرم (address)
  initialCenter?: [number, number]; // مرکز پیش‌فرض نقشه ( تهران)
  zoom?: number;
}

export default function GetMapInput({
  value,
  onChange,
  initialAddress = "تهران",
  onAddressChange,
  initialCenter = [35.6892, 51.389],
  zoom = 13,
}: GetMapInputProps) {
  // موقعیت داخلی برای نمایش روی نقشه
  const [position, setPosition] = useState<[number, number]>(
    value ? [value.lat, value.lng] : initialCenter
  );

  // متن آدرس داخل input
  const [address, setAddress] = useState<string>(initialAddress);

  // اگر value از بیرون (فرم) تغییر کنه، position داخلی رو هم سینک کن
  useEffect(() => {
    if (value) {
      const newPos: [number, number] = [value.lat, value.lng];
      setPosition(newPos);
    }
  }, [value]);

  // وقتی موقیت lat,lng تغییر کرد روی نقشه نمایش داده بشه
  function Recenter({ when }: { when: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.setView(when, map.getZoom());
    }, [when, map]);
    return null;
  }

  // جستجو (geocoding) با Nominatim
  const handleSearch = async () => {
    if (!address) return;

    const result = await geocodeAddress(address);
    if (result) {
      const { lat, lng, display_name } = result;
      setPosition([lat, lng]);
      onChange({ lat, lng }); // ست کردن موقعیت در فرم
      if (onAddressChange) onAddressChange(display_name);
    } else {
      toast.error("آدرس وارد شده وجود ندارد");
    }
  };

  // هندل کلیک روی نقشه: موقعیت را ست کن + reverse-geocoding برای پر کردن input آدرس (اختیاری)
  function ClickHandler() {
    useMapEvents({
      //با کلیک روی نقشه موقیت اونجا و دریافت کنه
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setPosition([lat, lng]);
        onChange({ lat, lng });

        // اگر خواستیم آدرس متنی رو هم به فرم منتقل کنیم — reverse geocode
        if (onAddressChange) {
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=fa`;
            const res = await fetch(url);
            const data = await res.json();
            const display = data?.display_name ?? "";
            setAddress(display);
            onAddressChange(display);
          } catch (err) {
            console.error(err);
          }
        }
      },
    });
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2 rtl">
      {/* ورودی متن آدرس (این آدرس را در فرم هم می‌توانیم ثبت کنیم با onAddressChange) */}
      <span className="text-xl text-gray-600">آدرس</span>
      <div className="rtl flex justify-between items-center gap-x-3 border border-gray-200 rounded-xl w-full px-4 py-4 text-gray-700 text-xl">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="آدرس را وارد کنید..."
          className="placeholder:text-gray-400 placeholder:text-lg w-full rtl outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          className=" rounded-lg text-center cursor-pointer"
        >
          <span>جستوجو</span>
        </button>
      </div>

      {/* نقشه */}
      <div className="w-full h-[200px] border rounded">
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Recenter when={position} />
          <ClickHandler />

          <Marker position={position}>
            <Popup>{address || "مکان انتخاب‌شده"}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
