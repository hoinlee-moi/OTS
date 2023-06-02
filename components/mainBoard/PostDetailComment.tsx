import Avatar from "../Avatar";
import styles from "./PostDetail.module.css";

export default function PostDetailComment() {
  return (
    <div className={styles.comment}>
      <Avatar image="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685551914293_hfa0542lf5_main_info_4.jpg?alt=media&token=4277c401-820b-49b6-8c1c-7a157f97116d" />
      <p>댓글</p>
    </div>
  );
}
