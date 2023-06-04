import { useContext } from "react";
import { detailPostDataContext } from "./PostDetail";
import styles from "./postDetail.module.css";

import Avatar from "../Avatar";
import PostDetailFoodList from "./PostDetailFoodList";
import PostDetailCommentList from "./PostDetailCommentList";

export default function PostDetailContent() {
  const {postData} = useContext(detailPostDataContext)

  return (
    <div className={styles.contentWrap}>
      <div className={styles.postUserWrap}>
        <div>
          <Avatar image={postData&&postData.userProfile} />
        </div>
        <p>{postData&&postData.nickName}</p>
        <div>
        </div>
      </div>
      <div className={styles.postContentWrap}>
        <div className={styles.postContent}>
          <p>{postData&&postData.content}</p>
        </div>
      </div>
      <div className={styles.foodListWrap}>
        <PostDetailFoodList />
      </div>
      <PostDetailCommentList/>
    </div>
  );
}
