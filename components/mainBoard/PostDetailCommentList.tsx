import Avatar from "../Avatar";
import styles from "./PostDetail.module.css"
import PostDetailComment from "./PostDetailComment";


export default function PostDetailCommentList() {
  return (
    <div className={styles.commentWrap}>
      <div className={styles.commentInput}>
        <input type="text" />
        <button>게시</button>
      </div>
      <div className={styles.commentList}>
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
        <PostDetailComment />
      </div>
    </div>
  );
}
