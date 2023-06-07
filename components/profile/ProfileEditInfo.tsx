import { useContext, useEffect, useState } from "react";
import styles from "./editModal.module.css";
import { editData, profileUserDataContext } from "./ProfileWrap";

const ProfileEditInfo = () => {
  const { userData, setEditUserData } = useContext(profileUserDataContext);
  const [gender, setGender] = useState("");
  const [editNickname, setEditNickname] = useState("");

  useEffect(() => {
    if (userData) setGender(userData.gender);
  }, []);

  useEffect(()=>{
    setEditUserData((snap:editData)=>{
        return {
            ...snap,
            nickname:editNickname
        }
    })
  },[editNickname])

  useEffect(()=>{
    setEditUserData((snap:editData)=>{
        return {
            ...snap,
            gender:gender
        }
    })
  },[gender])
  return (
    <div>
      <div className={styles.nickname}>
        <p>닉네임</p>
        <input
          type="text"
          defaultValue={userData.nickname}
          onChange={(e) => setEditNickname(e.target.value)}
          maxLength={12}
        />
      </div>
      <div className={styles.gender}>
        <p>성별</p>
        <div>
          <label>
            <span>남</span>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            <span>여</span>
            <input
              type="radio"
              value="femail"
              checked={gender === "femail"}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            <span>비공개</span>
            <input
              type="radio"
              value="none"
              checked={gender === "none"}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditInfo;
