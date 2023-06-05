import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    if(session){
      const user = session.user as any
      const commentId = data._id
      if(user._id===data.userId){
        const db = (await connectDB).db("OTS");
        try {
          const response = await db.collection('postComment').deleteOne({_id:new ObjectId(commentId) })
          if( response.acknowledged){
            return NextResponse.json({message:"success"},{status:200})
          }
        } catch (error) {
          return NextResponse.json({message:"Internal Server Error!"},{status:500})
        }
      }
    }
  
    return NextResponse.error().status
  }
  
  export async function PUT(request:NextRequest) {
    const session = await getServerSession(authOptions);
    const data = await request.json()
    console.log(data)
    if(session) {
      const user = session.user as any
      if(user._id===data.userId){
        const db = (await connectDB).db('OTS')
        try {
          const response = await db.collection('postComment').updateOne({_id:new ObjectId(data._id)},{"$set":{"comment":data.comment}})
          if(response.acknowledged) {
            return NextResponse.json({message:"success update"},{status:200})
          }
        } catch (error) {
          return NextResponse.json({message:"Internal Server Error!"},{status:500})       
        }
      }
    }
    return NextResponse.error().status
  }