import { client } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await client();
    const users = await UserModel.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting users" },
      { status: 500 }
    );
  } finally {
    await client();
  }
}
