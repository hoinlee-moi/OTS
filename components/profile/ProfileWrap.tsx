"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import UserProfileImg from "./UserProfileImg";
import styles from "./profile.module.css";
import { getUserProfile } from "@/util/api";


export default function ProfileWrap({ param }: { param: { email: string } }) {
  const [userData, setUserData] = useState<any>();

  const { data }: any = useSession();
  useEffect(() => {
    if (param.email !== "email") {
      getUserData();
    } else {
      setUserData(data.user);
    }
  }, []);

  const getUserData = async () => {
    try {
      const response = await getUserProfile(param.email);
      if(response.status===200) setUserData(response.data)
    } catch (error) {
      alert('서버와 연결이 올바르지 않습니다')
      console.log(error);
    }
  };
  return (
    <div className={styles.profileWrap}>
      {userData && (
        <>
          <UserProfileImg profile={userData.profileUrl} />
          <UserInfo userData={userData} />
        </>
      )}
    </div>
  );
}
