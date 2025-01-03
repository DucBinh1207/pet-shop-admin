import { CookieKey } from "@/constants/cookie-key";
import { getRemainingTimeFromToken } from "@/utils/get-remaining-time-from-token";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return Response.json({ message: "Failed" }, { status: 401 });
    }

    const remainingTime = getRemainingTimeFromToken(token);

    cookies().set({
      name: CookieKey.AUTH_TOKEN_ADMIN,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: remainingTime,
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(CookieKey.AUTH_TOKEN_ADMIN);

    if (!token) {
      return new Response("No token found", {
        status: 400,
      });
    }
    return Response.json(token.value);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(CookieKey.AUTH_TOKEN_ADMIN);

    if (token) {
      cookies().delete(CookieKey.AUTH_TOKEN_ADMIN);
      return Response.json({ message: "Success" }, { status: 200 });
    } else {
      return new Response("No token found", {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
