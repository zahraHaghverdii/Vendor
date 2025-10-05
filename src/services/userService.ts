import type { User } from "../types/Users";
import { generateToken } from "../utils/jwt";

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

// fetch login
export async function LoginUser({ email, password }: User) {
  try {
    const users = await getAllUsers();
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) throw new Error("ایمیل یا رمز عبور اشتباه است");

    const token = generateToken(user);

    return { user, token };
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
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  }
}
