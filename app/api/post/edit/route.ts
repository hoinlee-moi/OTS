import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    const data = await request.json()
    if(session) {
        const user = session.user as any
        const postId = data.postId
        if(user._id===data.userId){
            const db =(await connectDB).db('OTS')
            try {
                const response = await db.collection('post').deleteOne({_id: new ObjectId(postId)})
                if(response.acknowledged) {
                    return NextResponse.json({message:"success"},{status:200})
                }
            } catch (error) {
                return NextResponse.json({message:"Internal Server Error!"},{status:500})
            }
        }
    }
  return NextResponse.error().status;
}
export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions)
    const data = await request.json()
    if(session) {
        const user = session.user as any
        if(user._id===data.userId){
            const db = (await connectDB).db('OTS')
            try {
                const response = await db.collection('post').updateOne({_id:new ObjectId(data.postId)},{"$set":{"content":data.content}})
                if(response.acknowledged){
                    return NextResponse.json({message:"success"},{status:200})
                }
            } catch (error) {
                return NextResponse.json({message:"Internal Server Error!"},{status:500})
            }
        }
        
    }
  return NextResponse.error().status;
}
