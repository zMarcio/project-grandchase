import { UserLogin } from "@/interface/user_interface";
import { client } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  await client();
  const user: UserLogin = await request.json();
  console.log("aqui é o user", user);
  if (!user) {
    return NextResponse.json({
      message: "No user provided in the request",
      status: 400,
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    // Check if the email is valid
    if (!emailRegex.test(user.email)) {
      const userNickName = await UserModel.findOne({ nickname: user.nickname });
      // Check if the nickname is already in UserModel
      if (userNickName) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 400 }
        );
      }
    }
    // Check if the email is already in UserModel
    const userEmail = await UserModel.findOne({ email: user.email });
    if (!userEmail) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // fault implementation bcrypt in password
    const userPassword = await UserModel.findOne({ password: user.password });
    if (!userPassword) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ mensagem: "Login sucesseful!" });
  } catch (error) {
    console.log("aqui é o erro", error);
    return NextResponse.json({ erros: "Error getting user" }, { status: 500 });
  } finally {
    await client();
  }
}
