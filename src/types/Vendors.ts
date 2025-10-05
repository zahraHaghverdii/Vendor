export interface Vendors {
  id: number;
  companyName: string;
  manager: string;
  address?: string;
  phone: string;
  logo: string;
  location?: {
    lat: number;
    lng: number;
  };
}
