import { User } from "@/interface/user_interface";
import { client, close } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request): Promise<NextResponse> {
  await client();
  const user: User = await request.json();
  // Check if the user is provided in the request
  if (!user) {
    return NextResponse.json(
      { message: "No user provided in the request" },
      { status: 400 }
    );
  }
  // Check if the email is valid
  if (emailRegex.test(user.email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    // Check if the email is already in UserModel
    const userNickName = await UserModel.findOne({ nickname: user.nickname });
    if (userNickName) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const userEmail = await UserModel.findOne({ email: user.email });
    if (userEmail) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await close();
  }
}
