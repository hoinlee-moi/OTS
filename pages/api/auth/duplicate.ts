import { connectDB } from "@/util/database";
import { REGULAR } from "@/util/reg";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reg = REGULAR;
  if (req.method == "GET") {
    let db = (await connectDB).db("OTS");
    let user = await db.collection("user");
    if (Object.keys(req.query)[0] === "email") {
      const userEmail = req.query.email as string;
      if (!reg.regEmail.test(userEmail)) {
        return res.status(400).end();
      }
      try {
        let dup = user.findOne({ email: userEmail });
        if (!dup) {
          return res.status(409).end();
        }
        return res.status(200).end();
      } catch (error) {
        return res.status(500).end();
      }
    }
    if (Object.keys(req.query)[0] === "nickname") {
      const userNickname = req.query.nickname as string;
      if (!reg.regNickname.test(userNickname)) {
        return res.status(400).end();
      }
      try {
        let dup = user.findOne({ nickname: userNickname });
        if (!dup) {
          return res.status(409).end();
        }
        return res.status(200).end();
      } catch (error) {
        return res.status(500).end();
      }
    }
  }
}
