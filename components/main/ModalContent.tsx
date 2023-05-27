import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MakeModal.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import useAlert from "@/hooks/useAlert";
type props = {
  setPostData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ModalContent({ setPostData }: props) {
  const [postContent, setPostContent] = useState("");
  const [uploadAlert, setUploadAlert] = useAlert(false);

  const contentChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (postContent.length >= 501) {
      setUploadAlert();
      return;
    }
    const value = e.target.value as SetStateAction<string>;
    setPostContent(value);
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <input type="search" placeholder="음식 검색.." name="foodSearch" />
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
        <div className={styles.searchList}>
          <h3>목록</h3>
          <ul>
            <li>
              자장면<span></span>
            </li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
            <li>자장면</li>
            <li>탕수육</li>
            <li>돌솥비빔밥</li>
          </ul>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <textarea
            name="content"
            placeholder="식단 소개..."
            maxLength={500}
            onChange={contentChangeHandle}
          />
          <span>{postContent.length}/500</span>
        </div>
        <div className={styles.foodListWrap}></div>
      </div>
      <div
        className={`${styles.uploadAlert} ${
          uploadAlert && styles.uploadAlertOff
        }`}
      >
        <p>내용은 500자까지만 가능합니다</p>
      </div>
    </div>
  );
}
