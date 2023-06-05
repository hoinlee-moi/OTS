import styles from "./profile.module.css";

export default function UserInfo() {
  return (
    <div className={styles.userInfoWrap}>
      <div className={styles.userInfo}>
        <p></p>
        {/* 남녀 아이콘 */}
        <button>프로필편집</button>
      </div>
      <div className={styles.userBoardCount}>
        <p>게시물 개수</p>
      </div>
    </div>
  );
}
