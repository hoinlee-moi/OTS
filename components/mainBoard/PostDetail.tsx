import React, { useContext, useEffect, useState } from "react";
import styles from "./PostDetail.module.css";
import { foodList } from "../main/MakeModal";
import { postListContext } from "./PostBoard";
import PostDetailImg from "./PostDetailImg";
import PostDetailContent from "./PostDetailContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getPostDetail } from "@/util/api";

type postData = {
  content: string;
  file: any;
  imgRatio: string;
  foodList: foodList;
  nuKcal: number;
  nuCarb: number;
  nuPro: number;
  nuFat: number;
  like: number;
  comment: number;
};

export const detailPostDataContext = React.createContext<any>({});

export default function PostDetail() {
  const { postDetailId, setPostDetailId } = useContext(postListContext);
  const [postData, setPostData] = useState<postData>();

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `
      background-color: #f6f6f6;
      min-height: 100vh;
      margin: 0;
      line-height: 1;`;
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    getPostDetailData();
  }, []);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) setPostDetailId("");
  };

  const getPostDetailData = async () => {
    try {
      const response = await getPostDetail(postDetailId);
      if (response.status === 200) {
        setPostData(response.data);
      }
    } catch (error) {
      alert("서버와의 접속이 올바르지 않습니다");
      setPostDetailId("");
    }
  };
  return (
    <detailPostDataContext.Provider value={{ postData, setPostData }}>
      <div className={styles.modalBack} onMouseDown={mouseDownHandle}>
        <FontAwesomeIcon icon={faX} className={styles.closeBtn} />
        <div
          className={styles.modalBody}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.modalTitle}>
            <h3>오늘의 식단</h3>
          </div>
          <div className={styles.contentContainer}>
            <PostDetailImg />
            <PostDetailContent />
          </div>
        </div>
      </div>
    </detailPostDataContext.Provider>
  );
}
