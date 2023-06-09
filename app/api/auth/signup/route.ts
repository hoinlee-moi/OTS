
import bcrypt from "bcrypt";
import { connectDB } from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
import { REGULAR } from "@/util/reg";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const reg = REGULAR
  if(!reg.regPs.test(data.password)){
    return NextResponse.json(
      { message: "password format is incorrect" },
      { status: 405 }
    )
  }
  const hash = await bcrypt.hash(data.password, 10);
  data.password = hash;
  data.profileUrl = "/assets/basic_profile.jpg";
  data.gender = "none";
  try {
    const db = (await connectDB).db("OTS");
    const response = await db.collection("user").insertOne(data);
    if (response.acknowledged) {
      return NextResponse.json(
        { message: "회원가입이 완료되었습니다" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
