import UserInfo from "./UserInfo";
import UserProfileImg from "./UserProfileImg";
import styles from "./profile.module.css";

export default function ProfileWrap() {
  return (
    <div className={styles.profileWrap}>
      <UserProfileImg />
      <UserInfo />
    </div>
  );
}
