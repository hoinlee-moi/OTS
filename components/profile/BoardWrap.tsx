'use client'
import { useEffect, useState } from "react";
import BoardTag from "./BoardTag";
import ProfileBoard from "./ProfileBoard";
import styles from "./profile.module.css";


export default function BoardWrap({ param }: { param: { email: string } }) {
  const [userPost,setUserPost] = useState<any>()


  useEffect(() => {
    if (param.email !== "email") {
      ;
    } else {
      
    }
  }, []);



  return (
    <div className={styles.boardContainer}>
      <BoardTag />
      <ProfileBoard />
    </div>
  );
}
