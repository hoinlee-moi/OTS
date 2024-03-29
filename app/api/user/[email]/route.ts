import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";

export async function GET(request: NextRequest) {
  const urlArr = await request.nextUrl.pathname.split("/");
  const session = await getServerSession(authOptions);
  const nickname = urlArr[urlArr.length - 1];
  if (session) {
    const db = (await connectDB).db("OTS");
    try {
      const response = await db
        .collection("user")
        .findOne({ nickname: nickname });
      if (response) {
        delete response.password;
        return NextResponse.json(response, { status: 200 });
      } else
        return NextResponse.json(
          { message: "Interner Server Error" },
          { status: 500 }
        );
    } catch (error) {
      return NextResponse.json(
        { message: "Interner Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.error().status;
}
