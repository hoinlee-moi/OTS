import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { REGULAR } from "@/util/reg";
import { connectDB } from "@/util/database";

export async function PUT(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  const reg = REGULAR;
  if (!session) return NextResponse.error().status;
  if (!reg.regPs.test(data.newPw)) return NextResponse.error().status;

  const user = session.user as any;
  if (user.emailId === data.userEmail) {
    const db = (await connectDB).db("OTS");
    const dbCurPassword = await db
      .collection("user")
      .findOne({ _id: new ObjectId(user._id) });
    if (!dbCurPassword) return NextResponse.error().status;
    const pwcheck = await bcrypt.compare(data.curPw, dbCurPassword.password);
    const change = await bcrypt.compare(data.newPw, dbCurPassword.password);
    if (!pwcheck)
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    if (change)
      return NextResponse.json({ message: "same password" }, { status: 400 });
    try {
      const hash = await bcrypt.hash(data.newPw, 10);
      const response = await db
        .collection("user")
        .updateOne(
          { _id: new ObjectId(user._id) },
          { $set: { password: hash } }
        );
      if (response.acknowledged) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.error().status;
    }
  }

  return NextResponse.error().status;
}
