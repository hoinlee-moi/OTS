import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getStorage, ref, uploadBytes } from "@firebase/storage";
import { app } from "@/util/firebase";
import { connectDB } from '@/util/database';



export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  if (session&&data.file.length>0) {
    const user = session.user as any;
    const postData = {
        userId : new ObjectId(user._id),
        nickName:user.nickname,
        userProfile:user.profileUrl,
        like:0,
        comment:0,
        ...data
    }
    try {
      const db = (await connectDB).db('OTS');
      const response = await db.collection('post').insertOne(postData)
      if(response.acknowledged){
        return NextResponse.json(
          { message: "글 작성이 완료되었습니다" },
          { status: 201 }
        );
      }
    } catch (error) {
      return NextResponse.json({ status: 500 });
    }
  }
  return NextResponse.json({ message: "올바르지 않은 접근입니다" },{ status: 400 });
}
