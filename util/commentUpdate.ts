import { ObjectId } from "mongodb";
import { connectDB } from "./database";

export async function commentUpdate(id: string) {
  const db = (await connectDB).db("OTS");
  try {
    const commentCount = (
      await db.collection("postComment").find({ postId: id }).toArray()
    ).length;
    const commentCountUpdate = await db
      .collection("post")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { comment: commentCount } }
      );
  } catch (error) {
    throw error
  }
}
