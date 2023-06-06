import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const ITEMS_PER_PAGE = 15;

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const params = await request.nextUrl.searchParams;
  if (session) {
    const db = (await connectDB).db("OTS");
    const page = parseInt(params.get("page") as string);
    if (params.get("state") === "all") {
      try {
        const response = await db
          .collection("post")
          .find({ nickName: params.get("nickname") })
          .skip((page - 1) * 15)
          .project({ _id: 1, comment: 1, file: 1 })
          .sort({ _id: -1 })
          .limit(ITEMS_PER_PAGE)
          .toArray();

        const lastPage = response.length < ITEMS_PER_PAGE;
        return NextResponse.json({ response, lastPage }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "Interner Server Error" },
          { status: 500 }
        );
      }
    }
    if (params.get("state") === "com") {
      try {
        const postIdArr = await db
          .collection("postComment")
          .find({ nickname: params.get("nickname") })
          .skip((page - 1) * 15)
          .project({ _id: 0, postId: 1 })
          .sort({ _id: -1 })
          .limit(ITEMS_PER_PAGE)
          .toArray();

        const lastPage = postIdArr.length < ITEMS_PER_PAGE;
        const idArray = postIdArr.map((val) => {
          return new ObjectId(val.postId);
        });
        const response = await db
          .collection("post")
          .find({ _id: { $in: idArray } })
          .sort({ _id: -1 })
          .toArray();
        return NextResponse.json({ response, lastPage }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "Interner Server Error" },
          { status: 500 }
        );
      }
    }
  }
  return NextResponse.error().status;
}
