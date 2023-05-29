
import { authOptions } from "../[...nextauth]/route"
import { firebaseStorage } from "@/util/firebase"
import { ref } from "@firebase/storage"
import { NextApiRequest } from "next"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const data = await request.formData()
    let session = await getServerSession(authOptions) as any
    console.log(session)
    if(!session) {
        return NextResponse.json({ error: 'not Login' }, { status: 500 })
    }

    if(data.get("userProfile")){
        try {
            const profileRef = ref(firebaseStorage,`userProfile/Profile[${session.user._id}]`)
        } catch (error) {
            
        }
    }
    try {

        let updateData = {
            nickname : data.get("nickname"),
            gender : data.get("nickname"),
        }
    } catch (error) {
        
    }
    // const file: File | null = data.get('file') as unknown as File
    return NextResponse.json({success:true})
    
  }