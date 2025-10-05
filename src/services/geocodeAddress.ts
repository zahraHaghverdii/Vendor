// services/mapService.ts
export interface GeocodeResult {
  lat: number;
  lng: number;
  display_name: string;
}

const BASE_URL_MAP = import.meta.env.VITE_API_URL_MAP;

export async function geocodeAddress(
  address: string
): Promise<GeocodeResult | null> {
  try {
    const url = `${BASE_URL_MAP}${encodeURIComponent(
      address
    )}&limit=1&accept-language=fa`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    } else {
      throw new Error("آدرس وجود ندارد");
    }
  } catch (err) {
    console.error("Geocoding error:", err);
    throw new Error("خطا در برقراری ارتباط با سرور");
  }
}
