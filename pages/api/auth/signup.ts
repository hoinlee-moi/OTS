import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method == "POST") {
   const hash = await bcrypt.hash(req.body.password,10)
   req.body.password = hash
   req.body.profileUrl = ""
   req.body.sex = "none"
   const db = (await connectDB).db('OTS')
   await db.collection('user').insertOne(req.body)
   res.status(201).end()
}
}
