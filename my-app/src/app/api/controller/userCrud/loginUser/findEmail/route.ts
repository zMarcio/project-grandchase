import { User, UserLogin } from "@/interface/user_interface";
import { client } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  await client();
  const url = new URL(request.url);
  const email: string | null = url.searchParams.get("email");

  if (!email) {
    return NextResponse.json({
      message: "No email provided in the URL",
      status: 400,
    });
  }

  try {
    const user: User | null = await UserModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      message: "Error getting user",
      status: 500,
    });
  }
}
