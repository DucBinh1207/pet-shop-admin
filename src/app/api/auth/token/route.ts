import { CookieKey } from "@/constants/cookie-key";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return Response.json({ message: "Failed" }, { status: 401 });
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    const payLoad = JSON.parse(jsonPayload);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expiresTimestamp = payLoad.exp;
    const remainingTime = expiresTimestamp - currentTimestamp;

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
