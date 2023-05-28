import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
      const foodName = req.query.foodName;
      try {
        const response = await axios.get(
          `http://openapi.foodsafetykorea.go.kr/api/${process.env.NEXT_PUBLIC_FOOD_API_KEY}/I2790/json/1/30/DESC_KOR=${foodName}`
        );
        if (response.status === 200) {
            const setArray = Array.from(new Set(response.data.I2790.row))
          const foodList = setArray.map((item: any) => {
            return {
              name: item.DESC_KOR,
              gram: parseInt(item.SERVING_SIZE),
              kcal: parseInt(item.NUTR_CONT1),
              carbo: parseInt(item.NUTR_CONT2),
              protien: parseInt(item.NUTR_CONT3),
              fat: parseInt(item.NUTR_CONT4),
            };
          });

          return res.status(200).json(foodList);
        }
      } catch (error) {
        return res.status(500).end();
      }
    }
  }
}
