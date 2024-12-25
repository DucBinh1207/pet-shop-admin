import { RoleKey } from "@/constants/role-key";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { role, time } = await req.json();

    if (!role || !time) {
      return Response.json({ message: "Failed" }, { status: 401 });
    }

    cookies().set({
      name: RoleKey.USER_ROLE,
      value: role,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: time,
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
    const role = cookieStore.get(RoleKey.USER_ROLE);

    if (!role) {
      return new Response("No user role found", {
        status: 400,
      });
    }
    return Response.json(role.value);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    const role = cookieStore.get(RoleKey.USER_ROLE);

    if (role) {
      cookies().delete(RoleKey.USER_ROLE);
      return Response.json({ message: "Success" }, { status: 200 });
    } else {
      return new Response("No role found", {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
