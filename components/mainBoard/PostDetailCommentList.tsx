import { useContext, useState } from "react";
import Avatar from "../Avatar";
import styles from "./PostDetail.module.css"
import PostDetailComment from "./PostDetailComment";
import { detailPostDataContext } from "./PostDetail";
import { postCommentWrite } from "@/util/api";


export default function PostDetailCommentList() {
  const {postData} = useContext(detailPostDataContext)
  const [comment,setCommnet] = useState("")
  const [postState,setPostState] = useState(false)
  const [commentList,setCommnetLsit] = useState<any>([])

  const getPostComment = async() => {
    try {
      
    } catch (error) {
      
    }
  }

  const commentPostHandle = async() => {
    if(comment.trim().length<1||postState) return;
    setPostState(true)
    try {
      const data={
        _id : postData._id,
        comment : comment
      }
      const response = await postCommentWrite(data)
      setPostState(false)
    } catch (error) {
      console.log(error)
      setPostState(false)
    }
  }

  return (
    <div className={styles.commentWrap}>
      <div className={styles.commentInput}>
        <input type="text" onChange={(e)=>setCommnet(e.target.value)} maxLength={50}/>
        <button onClick={commentPostHandle} disabled={postState} >게시</button>
      </div>
      <div className={styles.commentList}>
        <PostDetailComment profile="" comment="" />
      </div>
    </div>
  );
}
