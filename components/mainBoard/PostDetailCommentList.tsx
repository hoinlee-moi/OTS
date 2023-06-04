import { useContext, useEffect, useState } from "react";
import styles from "./postDetail.module.css";
import PostDetailComment from "./PostDetailComment";
import { detailPostDataContext } from "./PostDetail";
import { postCommentWrite } from "@/util/api";
import { getCommentList } from "@/util/api";

export type commentList={
  comment:string
  postId:string
  nickname:string
  userId:string
  userProfile:string
  _id:string
}

export default function PostDetailCommentList() {
  const { postData } = useContext(detailPostDataContext);
  const [comment, setCommnet] = useState("");
  const [postState, setPostState] = useState(false);
  const [commentList, setCommentList] = useState<commentList[]>([]);

  useEffect(() => {
    getPostComment();
  }, [postData]);

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commentPostHandle();
  };

  const getPostComment = async () => {
    if (postData) {
      try {
        const response = await getCommentList(postData._id);
        if(response.status===200) {
          setCommentList(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const commentPostHandle = async () => {
    if (comment.trim().length < 1 || postState) return;
    setPostState(true);
    try {
      const data = {
        _id: postData._id,
        comment: comment,
      };
      const response = await postCommentWrite(data);
      if(response.status ===200){
        getPostComment()
        setCommnet("")
      }
      setPostState(false);
    } catch (error) {
      alert("서버와의 연결이 실패했습니다")
      console.log(error);
      setPostState(false);
    }
  };

  

  return (
    <div className={styles.commentWrap}>
      <div className={styles.commentInput}>
        <input
          type="text"
          onChange={(e) => setCommnet(e.target.value)}
          onKeyDown={keyDownHandle}
          value={comment}
          maxLength={50}
          placeholder="댓글 작성..."
        />
        <button onClick={commentPostHandle}  disabled={postState}>
          게시
        </button>
      </div>
      <div className={styles.commentList}>
        {commentList.map((item:commentList,idx)=>{
          return <PostDetailComment comment={item} getPostComment={getPostComment} key={idx} />
        })}   
      </div>
    </div>
  );
}
