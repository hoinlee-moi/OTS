import { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./makeModal.module.css";
import PostFoodList from "./PostFoodList";
import { newPostData, newPostContext } from "./MakeModal";
import ContentFoodSearch from "./ContentFoodSearch";

export default function ModalContent() {
  const { postData, setPostData } = useContext(newPostContext);

  const setPostDataContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 300) {
      setPostData((snap: newPostData) => {
        return { ...snap };
      });
      return;
    }
    setPostData((snap: newPostData) => {
      return { ...snap, content: e.target.value };
    });
  };

  useEffect(() => {
    if (postData.foodList.length === 1) {
      setPostData;
    }
  }, [postData.foodList]);

  return (
    <div className={styles.contentContainer}>
      <ContentFoodSearch />
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <textarea
            name="content"
            placeholder="식단 소개..."
            maxLength={300}
            onChange={setPostDataContent}
            value={postData.content}
          />
          <span>{postData.content.length}/300</span>
        </div>
        <PostFoodList />
      </div>
    </div>
  );
}
