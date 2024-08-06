import { User } from "@/interface/user_interface";
import { client, close } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const saltRounds = 10;

export async function POST(request: Request): Promise<NextResponse> {
  await client();
  const user: User = await request.json();
  console.log(user);
  const errors: Record<string, string> = {};

  if (!user) {
    return NextResponse.json(
      { errors: { global: "No user provided in the request" } },
      { status: 400 }
    );
  }

  if (!emailRegex.test(user.email)) {
    errors.email = "Invalid email format";
  }

  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  try {
    const userNickName = await UserModel.findOne({ nickname: user.nickname });
    if (userNickName) {
      errors.nickname = "Nickname already exists";
    }
    const userEmail = await UserModel.findOne({ email: user.email });
    if (userEmail) {
      errors.email = "E-mail already exists";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const userCreated = new UserModel({
      email: user.email,
      password: hashedPassword,
      name: user.nickname, // Atribuição direta do valor
    });

    await userCreated.save();
    console.log("Passei do save");
    return NextResponse.json({ message: "User created successfully" });
  } catch (error: any) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { errors: "Error creating user" },
      { status: 400 }
    );
  } finally {
    await close();
  }
}
