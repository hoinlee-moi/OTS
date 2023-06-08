import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  if (!session) return NextResponse.error().status;
  const user = session.user as any;
    console.log(data,"들어온 데이터")
    console.log(user,"세션데이터")
  if (data.email === user.emailId) {
    const db = (await connectDB).db("OTS");
    const nickDup = await db
      .collection("user")
      .findOne({ nickname: data.nickname });
    if (nickDup) {
      return NextResponse.json(
        { message: "Duplicate nickname found" },
        { status: 400 }
      );
    }
    console.log("중복검사 통과함")
    try {
      const updateData = {
        nickname: data.nickname,
        gender: data.gender,
        profileUrl:
          data.profileImgUrl.length < 1
            ? user.profileUrl
            : data.profileImgUrl[0].url,
        profileImgName:
          data.profileImgUrl.length < 1
            ? user.profileImgName
            : data.profileImgUrl[0].name,
      };
      const response = await db.collection("user").updateOne(
        { _id: new ObjectId(user._id) },
        {
          $set: updateData,
        }
      );
        
      if (response.acknowledged) {
        await db.collection("post").updateMany(
          { userId: new ObjectId(user._id) },
          {
            $set: {
              nickName: updateData.nickname,
              userProfile: updateData.profileUrl,
            },
          }
        );
         await db.collection("postComment").updateMany(
          { userId: user._id},
          {
            $set: {
              nickname: updateData.nickname,
              userProfile: updateData.profileUrl,
            },
          }
        );
        console.log(user,updateData)
        return NextResponse.json({ update: updateData }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.error().status;
    }
  }
  return NextResponse.error().status;
}
