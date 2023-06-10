import { connectDB } from "@/util/database";
import { REGULAR } from "@/util/reg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reg = REGULAR;
  const params = request.nextUrl.searchParams;
  let db = (await connectDB).db("OTS");
  let user = await db.collection("user");
  if (params.has("email")) {
    const userEmail = params.get("email") as string;
    if (!reg.regEmail.test(userEmail)) {
      return NextResponse.json(
        {
          message: "Email format is incorrect",
        },
        {
          status: 405,
        }
      );
    }
    try {
      let dup = await user.findOne({ emailId: userEmail })   
      if (dup) {
        return NextResponse.json(
          {
            message: "Duplicate email found",
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.json(
        {
          message: "success",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
  if (params.has("nickname")) {
    const userNickname = params.get("nickname") as string;
    if (!reg.regNickname.test(userNickname)) {
      return NextResponse.json(
        {
          message: "nickname format is incorrect",
        },
        {
          status: 405,
        }
      );
    }
    try {
      let dup = await user.findOne({ nickname: userNickname });
      if (dup) {
        return NextResponse.json(
          {
            message: "Duplicate nickname found",
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.json(
        {
          message: "success",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}