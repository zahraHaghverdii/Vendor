import type { Vendors } from "../types/Vendors";

const BASE_URL = import.meta.env.VITE_API_URL;

// fetch Vendor
export async function getAllVendors() {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// fetch id vendor
export async function getIdVendor(id: number | null) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// ==================================================================================
//Add Vendor
export async function AddVendor(vendorData: Vendors) {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData), // داده‌های فرم اینجا ارسال میشن
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// Delete Vendor
export async function DeleteVendor(id: number | undefined) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// Edit Vendor
export async function EditVendor(id: number | undefined, data: Vendors) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// ===================================================================================
// Search Vendor
export async function SearchVendorFetch(companyName: string) {
  if (!companyName) return [];

  try {
    // const res = await fetch(`${BASE_URL}/?companyName=${companyName}`, {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    const filtered = data.filter((v: Vendors) =>
      v.companyName.toLowerCase().includes(companyName.trim().toLowerCase())
    );

    return filtered;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// Pagination Vendor
export async function PaginationVendorFetch(
  page: number,
  limit: number
): Promise<{ data: Vendors[]; total: number }> {
  const params = new URLSearchParams();
  try {
    params.append("_page", page.toString());
    params.append("_limit", limit.toString());
    const res = await fetch(`${BASE_URL}/vendors?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const total = Number(res.headers.get("X-Total-Count")) || data.length;
    return { data, total };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}
