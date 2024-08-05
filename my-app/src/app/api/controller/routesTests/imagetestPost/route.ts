import { client } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.json();
  try {
    await client();

  } catch (error) {
    console.log(error);
  } finally {
    await client();
  }

  return NextResponse.json(data, { status: 200 });
}
