import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const { data } = await axios.post("https://dummyjson.com/auth/login", {
      username: username,
      password: password,
    });

    const res = NextResponse.json({ ...data });

    const token = data.accessToken;
    const refreshToken = data.refreshToken;

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 5 * 60,
    });

    res.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
}
