import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let meRes = await fetch("https://dummyjson.com/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  let newAccessToken: string | null = null;

  if (meRes.status === 401 && refreshToken) {
    const refreshRes = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 5,
      }),
    });

    if (!refreshRes.ok) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const refreshData = await refreshRes.json();
    newAccessToken = refreshData.accessToken;

    meRes = await fetch("https://dummyjson.com/auth/me", {
      headers: { Authorization: `Bearer ${newAccessToken}` },
    });
  }

  if (!meRes.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await meRes.json();

  const response = NextResponse.json(user);

  if (newAccessToken) {
    response.cookies.set({
      name: "token",
      value: newAccessToken,
      secure: false,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 5,
    });
  }

  return response;
}
