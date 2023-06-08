"use client";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import UserProfileImg from "./UserProfileImg";
import styles from "./profile.module.css";
import { getUserProfile } from "@/util/api";
import ProfileEditModal from "./ProfileEditModal";



export const profileUserDataContext = createContext<any>({});

export default function ProfileWrap({
  param,
}: {
  param: { nickname: string };
}) {
  const [pageLoading, setPageLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  
  const [profilEdit, setProfileEdit] = useState(false);
  const { data }: any = useSession();

  useEffect(() => {
    setPageLoading(true);
    getUserData()
  }, []);
useEffect(()=>{
console.log(userData,"유저데이터")
console.log(data,"세션데이터")
},[userData,data.user])

  const getUserData = async () => {
    try {
      const response = await getUserProfile(param.nickname);
      if (response.status === 200) setUserData(response.data);
    } catch (error) {
      alert("서버와 연결이 올바르지 않습니다");
      console.log(error);
    }
  };
  return (
      <profileUserDataContext.Provider value={{ userData }}>
        {profilEdit && <ProfileEditModal closeModal={setProfileEdit} />}
        {pageLoading && (
          <div className={styles.profileWrap}>
            {userData && (
              <>
                <UserProfileImg profile={userData.profileUrl} />
                <UserInfo />
              </>
            )}
            {data?.user.nickname === userData?.nickname && (
              <button onClick={() => setProfileEdit(true)}>프로필편집</button>
            )}
          </div>
        )}
      </profileUserDataContext.Provider>
  );
}
