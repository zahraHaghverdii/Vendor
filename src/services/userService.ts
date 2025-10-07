import type { User, UserLoginData } from "../types/Users";
import { v4 as uuidv4 } from "uuid";

// getUser
const BASE_URL = import.meta.env.VITE_API_URL_BAS;

// fetch All User
export async function getAllUsers() {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
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

// fetch All User
export async function getIdUser(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
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

// fetch login
export async function LoginUser({ email, password }: UserLoginData) {
  try {
    const users = await getAllUsers();
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) throw new Error("ایمیل یا رمز عبور اشتباه است");

    // توکن ست بشه و ارسال بشه
    const fakeToken = uuidv4();
    return { user, token: fakeToken };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}

// fetch signup
export async function SignupUser({ username, email, password }: User) {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}:خطا در برقراری ارتباط با سرور`);
    }
    const user = res.json();
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}
