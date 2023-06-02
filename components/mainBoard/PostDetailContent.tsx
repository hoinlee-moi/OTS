import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import styles from "./PostDetail.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PostDetailFoodList from "./PostDetailFoodList";
import PostDetailCommentList from "./PostDetailCommentList";
import { useContext } from "react";
import { detailPostDataContext } from "./PostDetail";

export default function PostDetailContent() {
  const {postData} = useContext(detailPostDataContext)

  return (
    <div className={styles.contentWrap}>
      <div className={styles.postUserWrap}>
        <div>
          <Avatar image="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685551914293_hfa0542lf5_main_info_4.jpg?alt=media&token=4277c401-820b-49b6-8c1c-7a157f97116d" />
        </div>
        <p>{postData&&postData.nickName}</p>
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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
