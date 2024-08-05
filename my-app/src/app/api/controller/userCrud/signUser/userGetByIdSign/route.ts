import { User } from "@/interface/user_interface";
import { client } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  // Get the URL from the request
  const url = new URL(request.url);

  // Get the id from the URL
  const id = url.searchParams.get("id");

  // Check if the id is present in the URL
  if (!id) {
    return NextResponse.json({
      message: "No id provided in the URL",
      status: 400,
    });
  }

  try {
    await client();
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting user" },
      { status: 500 }
    );
  } finally {
    await client();
  }
}
