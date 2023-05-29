
import { getServerSession } from "next-auth";

import axios from "axios";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  let session = await getServerSession(authOptions);
  const params = request.nextUrl.searchParams;
  if (session) {
    const foodName = params.get('foodName')
    try {
      const response = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${process.env.NEXT_PUBLIC_FOOD_API_KEY}/I2790/json/1/40/DESC_KOR=${foodName}`
      );
      if (response.status === 200) {
        const dataArray = response.data.I2790.row
        const foodList:any[] = []
        const nameSet = new Set()
        const editArray = dataArray.map((item: any) => {
          return {
            name: item.DESC_KOR,
            gram: parseInt(item.SERVING_SIZE),
            kcal: parseInt(item.NUTR_CONT1),
            carbo: parseInt(item.NUTR_CONT2),
            protien: parseInt(item.NUTR_CONT3),
            fat: parseInt(item.NUTR_CONT4),
          };
        });
        for(const food of editArray){
            if(!nameSet.has(food.name)){
                nameSet.add(food.name)
                foodList.push(food)
            }
        }
        console.log(foodList)
        return NextResponse.json({foodList : foodList},{status:200})
      }
    } catch (error) {
      return NextResponse.json({message:"Internal server error"},{status:500})
    }
  }
}
