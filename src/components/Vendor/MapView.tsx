import MapPicker from "../Map/MapPicker";

export default function MapView() {
  return (
    <div className="bg-gray-200 rounded-xl h-[500px] flex items-center justify-center col-span-2 order-2 md:order-1 z-10">
      <MapPicker />
    </div>
  );
}
