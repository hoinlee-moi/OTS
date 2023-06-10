import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./profile.module.css";
import {
  faPerson,
  faPersonDress,
  faPersonHalfDress,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { profileUserDataContext } from "./ProfileWrap";

export type userData = {
  emailId: string;
  gender: string;
  nickname: string;
  profileUrl: string;
  _id: string;
};


 const UserInfo=()=> {
  const {userData} = useContext(profileUserDataContext)
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
          <FontAwesomeIcon icon={faPerson} className={styles.genderMan} />
        )}
        {userData.gender === "female" && (
          <FontAwesomeIcon icon={faPersonDress} className={styles.genderWoman} />
        )}
        
      </div>
    </div>
  );
}
export default React.memo(UserInfo)