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
    try {
      const updateData: any = {
        nickname: data.nickname,
        gender: data.gender,
      };
      if (data.profileImgUrl.length > 0) {
        updateData.profileUrl = data.profileImgUrl[0].url;
        updateData.profileImgName = data.profileImgUrl[0].name;
      }
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
              userProfile:
                data.profileImgUrl.length > 0
                  ? data.profileImgUrl[0].url
                  : user.profileUrl,
            },
          }
        );
        await db.collection("postComment").updateMany(
          { userId: user._id },
          {
            $set: {
              nickname: updateData.nickname,
              userProfile:
                data.profileImgUrl.length > 0
                  ? data.profileImgUrl[0].url
                  : user.profileUrl,
            },
          }
        );
        const newToken = {
          _id: user._id,
          emailId: user.emailId,
          nickname: updateData.nickname,
          gender: updateData.gender,
          profileUrl:
            data.profileImgUrl.length > 0
              ? data.profileImgUrl[0].url
              : user.profileUrl,
          profileImgName:
            data.profileImgUrl.length > 0
              ? data.profileImgUrl[0].name
              : user.profileImgName,
        };
        return NextResponse.json({ token: newToken }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.error().status;
    }
  }
  return NextResponse.error().status;
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const param = request.nextUrl.searchParams;
  const email = param.get("email");
  if (session) {
    const user = session.user as any;
    if (email === user.emailId) {
      const db = (await connectDB).db("OTS");
      try {
        const response = db
          .collection("user")
          .deleteOne({ _id: new ObjectId(user._id) });
        if ((await response).acknowledged) {
          return NextResponse.json(
            { message: "success delete" },
            { status: 200 }
          );
        }
      } catch (error) {
        return NextResponse.error().status;
      }
    }
  }
  return NextResponse.error().status;
}
