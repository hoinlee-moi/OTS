"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import UserProfileImg from "./UserProfileImg";
import styles from "./profile.module.css";
import { getUserProfile } from "@/util/api";

export default function ProfileWrap({
  param,
}: {
  param: { nickname: string };
}) {
  const [pageLoading, setPageLoadin] = useState(false);
  const [userData, setUserData] = useState<any>();
  const { data }: any = useSession();

  useEffect(() => {
    setPageLoadin(true);
  }, []);

  useEffect(() => {
    if (param.nickname !== data.user.nickname) {
      getUserData();
    } else {
      setUserData(data.user);
    }
  }, [data]);

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
    <>
      {pageLoading && (
        <div className={styles.profileWrap}>
          {userData && (
            <>
              <UserProfileImg profile={userData.profileUrl} />
              <UserInfo userData={userData} />
            </>
          )}
        </div>
      )}
    </>
  );
}
