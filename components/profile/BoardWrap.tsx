import BoardTag from "./BoardTag";
import ProfileBoard from "./ProfileBoard";
import styles from "./profile.module.css";


export default function BoardWrap() {
  return (
    <div className={styles.boardContainer}>
      <BoardTag />
      <ProfileBoard />
    </div>
  );
}
