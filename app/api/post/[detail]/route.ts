import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const url = request.url.split("/");
  const id = url[url.length - 1];
  if (session) {
    const db = (await connectDB).db("OTS");
    try {
      const data = await db
        .collection("post")
        .findOne({ _id: new ObjectId(id) });

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Interner Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.error().status;
}
