import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();

    const cookieString = headersList.get("cookie") || "";

    const tokenMatch = cookieString.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const response = await fetch("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/me:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
