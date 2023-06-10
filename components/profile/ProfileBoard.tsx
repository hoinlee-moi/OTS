import { useContext } from "react";
import styles from "./profile.module.css";
import { userPostContext } from "./BoardWrap";

import { post } from "../mainBoard/PostBoard";
import PostItem from "../mainBoard/PostItem";
export default function ProfileBoard() {
  const { userPost,setUserPostId } = useContext(userPostContext);

  return (
    <div className={styles.boardWrap}>
      {userPost &&
        userPost.map((item: post) => {
          return (
            <article onClick={()=>setUserPostId(item._id)} key={item._id}>
              <PostItem listItem={item} />
            </article>
          );
        })}
    </div>
  );
}
