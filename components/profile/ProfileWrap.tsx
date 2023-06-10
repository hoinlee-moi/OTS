"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import UserProfileImg from "./UserProfileImg";
import styles from "./profile.module.css";
import { getUserProfile } from "@/util/api";
import ProfileEditModal from "./ProfileEditModal";
import { useRouter } from "next/navigation";



export const profileUserDataContext = createContext<any>({});

 const ProfileWrap=({
  param,
}: {
  param: { nickname: string };
}) =>{
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [profilEdit, setProfileEdit] = useState(false);
  const { data }: any = useSession();

  useEffect(() => {
    setPageLoading(true);
    getUserData()
  }, []);


  const getUserData = useCallback( async () => {
    try {
      const response = await getUserProfile(param.nickname);
      if (response.status === 200) setUserData(response.data);
    } catch (error) {
      router.push('/main')
      alert("유저 정보가 존재하지 않습니다");
      console.log(error);
    }
  },[data,param]);
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
export default React.memo(ProfileWrap)