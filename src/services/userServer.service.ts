import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return null;
    }

    const res = await axios.get("http://localhost:3000/api/me", {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response?.status === 401) {
        return null;
      }
    }

    return null;
  }
}
