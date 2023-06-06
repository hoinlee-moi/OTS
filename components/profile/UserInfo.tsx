import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./profile.module.css";
import { faPerson, faPersonDress, faPersonHalfDress } from "@fortawesome/free-solid-svg-icons";

export type userData = {
  emailId: string;
  gender: string;
  nickname: string;
  profileUrl: string;
  _id: string;
};
type props = {
  userData: userData;
};

export default function UserInfo({ userData }: props) {
  return (
    <div className={styles.userInfoWrap}>
      <div className={styles.userInfo}>
        <p>{userData.nickname}</p>
        {userData.gender === "none" && (
          <FontAwesomeIcon
            icon={faPersonHalfDress}
            className={styles.genderNone}
          />
        )}
        {userData.gender === "male" && (
          <FontAwesomeIcon
            icon={faPerson}
            className={styles.genderNone}
          />
        )}
        {userData.gender === "female" && (
          <FontAwesomeIcon
            icon={faPersonDress}
            className={styles.genderNone}
          />
        )}

        <button>프로필편집</button>
      </div>
      {/* <div className={styles.userBoardCount}>
        <p>
          게시물<span>0</span>
        </p>
      </div> */}
    </div>
  );
}
