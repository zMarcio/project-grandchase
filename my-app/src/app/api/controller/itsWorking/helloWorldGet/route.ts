import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  return NextResponse.json({ message: "Hello Wolrd!" });
}
