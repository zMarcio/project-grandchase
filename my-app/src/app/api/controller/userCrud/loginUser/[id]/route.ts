import { client } from "@/lib/db";
import UserModel from "@/model/user_models";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id: string = params.id;
  console.log("aqui é o id:", id);

  // Check if the id is present in the URL
  if (!id) {
    return NextResponse.json({
      message: "No id provided in the URL",
      status: 400,
    });
  }

  console.log("passei pelo primeiro if");

  try {
    await client();
    const user = await UserModel.findById(id);
    console.log("aqui é o user", user);
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
