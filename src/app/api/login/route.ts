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

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
}
