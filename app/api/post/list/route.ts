import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";

const ITEMS_PER_PAGE = 15;

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const params = request.nextUrl.searchParams;
  if (session) {
    const db = (await connectDB).db("OTS");
    const page = parseInt(params.get("page") as string);
    try {
      const postData = await db
        .collection("post")
        .find({})
        .skip((page - 1) * 15)
        .project({ _id: 1, like: 1, comment: 1, file: 1 })
        .sort({ _id: -1 })
        .limit(ITEMS_PER_PAGE)
        .toArray();
      const lastPage = postData.length < ITEMS_PER_PAGE;
      const resData: any[] = [];
      let insertData: any[] = [];
      for (let i = 0; i <= postData.length - 1; i++) {
        console.log(insertData.length,"...",resData.length,"....",i)
        insertData.push(postData[i]);
        if (i === postData.length - 1) {
          resData.push(insertData);
          break;
        }
        if (insertData.length === 5) {
          resData.push(insertData);
          insertData = [];
        }
      }
      console.log(resData)
      return NextResponse.json({ resData, lastPage }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Interner Server Error" },
        { status: 500 }
      );
    }
  }
}
