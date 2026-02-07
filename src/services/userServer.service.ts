import axios from "axios";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    console.log("cookie: ", cookieStore);

    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return null;
    }

    const cookieHeader = `token=${tokenCookie.value}`;

    const res = await axios.get(`http://localhost:3000/api/me`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}
