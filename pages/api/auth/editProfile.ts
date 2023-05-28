import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method == 'POST') {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
      const user = session.user as any;
      try {
        // console.log(formData.get('gender'));
        const db = (await connectDB).db('OTS');
        // await db.collection('user').updateOne(
        //   {
        //     _id: user._id,
        //   },
        //   {
        //     $set: {
        //       gender: gender,
        //       nickname: nickname,
        //       profileUrl: profileUrl,
        //     },
        //   }
        // );

        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
}
