import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import styles from "./postDetail.module.css";
import { commentList } from "./PostDetailCommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { deleteComment, putComment } from "@/util/api";

type props = {
  comment: commentList;
  getPostComment: any;
};

export default function PostDetailComment({ comment, getPostComment }: props) {
  const { data }: any = useSession();
  const [myComment, setMyComment] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [updateCommentVal, setUpdateCommentVal] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (data.user._id.toString() === comment.userId.toString()) {
      setMyComment(true);
    } else{
      setMyComment(false)
    }
  }, [comment, data]);

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") updateComment();
  };

  const deleteCommentHandle = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const deleteData = {
        _id: comment._id,
        userId: comment.userId,
      };
      try {
        const response = await deleteComment(deleteData);
        if (response.status === 200) {
          getPostComment();
        }
      } catch (error) {
        alert("서버와 연결이 올바르지 않습니다");
        console.log(error);
      }
    }
  };

  const updateComment = async () => {
    if (update) return;
    setUpdate(true);
    const updateData = {
      _id: comment._id,
      userId: comment.userId,
      comment: updateCommentVal,
    };
    try {
      const response = await putComment(updateData);
      setUpdate(false);
      setUpdateState(false);
      getPostComment();
    } catch (error) {
      console.log(error);
      setUpdate(false);
      alert("서버와 연결이 올바르지 않습니다");
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userProfileWrap}>
        <Avatar image={comment.userProfile} />
        <p>{comment.nickname}</p>
      </div>
      <div>
        <div>
          {updateState ? (
            <div className={styles.commentUpdate}>
              <input
                type="text"
                onChange={(e) => setUpdateCommentVal(e.target.value)}
                onKeyDown={keyDownHandle}
              />
              <button onClick={updateComment} disabled={update}>
                수정
              </button>
            </div>
          ) : (
            <p>{comment.comment}</p>
          )}
        </div>
      </div>
      {myComment && (
        <div className={styles.editBtnWrap}>
          <span onClick={() => setUpdateState(!updateState)}>
            <FontAwesomeIcon icon={faPen} />
          </span>
          <span onClick={deleteCommentHandle}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      )}
    </div>
  );
}
