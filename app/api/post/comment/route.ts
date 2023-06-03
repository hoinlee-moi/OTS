import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/util/database";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    
  }
  return NextResponse.error().status;
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  if (session) {
    const user = session.user as any;
    const db = (await connectDB).db("OTS");
    try {
      const commentData = {
        postId: data._id,
        comment: data.comment,
        userId: user._id,
        userProfile: user.profileUrl,
      };
      const respons = await db.collection("postComment").insertOne(commentData);
      if (respons.acknowledged) {
        return NextResponse.json(
          { message: "success PostComment" },
          { status: 200 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error!" },
        { status: 200 }
      );
    }
  }
  return NextResponse.error().status;
}
