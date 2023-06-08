import React, { useContext, useEffect, useState } from "react";
import styles from "./editModal.module.css";
import {  profileUserDataContext } from "./ProfileWrap";
import { editData } from "./ProfileEditModal";
import { REGULAR } from "@/util/reg";
import { nickNameDuplicate } from "@/util/api";


type props = {
  setEditUserData : React.Dispatch<React.SetStateAction<editData>>
  setNickCheck:React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileEditInfo = ({setEditUserData,setNickCheck}:props) => {
  const { userData } = useContext(profileUserDataContext);
  const [gender, setGender] = useState("");
  const [editNickname, setEditNickname] = useState("");
  const [failMs, setFailMs] = useState("");

  useEffect(() => {
    if (userData) setGender(userData.gender);
  }, []);
  useEffect(()=>{
    setFailMs("")
  },[editNickname])
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

  const nicknameDupCheck = async(e: React.FocusEvent<HTMLInputElement>) => {
    const reg = REGULAR;
    if (!reg.regNickname.test(e.target.value)) {
      setFailMs("닉네임은 2~12자이내 한글,숫자,영문,_,-를 포함할 수 있습니다")
      return;
    }
    try {
      const response = await nickNameDuplicate(e.target.value)
      if(response.status===200) {
        setNickCheck(true)
        setFailMs("")
      }
    } catch (error) {
      setNickCheck(false)
      setFailMs("사용중인 닉네임 입니다")
    }
  };

  return (
    <div>
      <div className={styles.nickname}>
        <p>닉네임</p>
        <input
          type="text"
          defaultValue={userData.nickname}
          onChange={(e) => setEditNickname(e.target.value)}
          maxLength={12}
          onBlur={nicknameDupCheck}
        />
        {failMs !== "" && <p className={styles.editFailMs}>{failMs}</p>}
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
