import { useContext, useState } from "react";
import styles from "./PostDetail.module.css";
import { foodList } from "../main/MakeModal";
import { postListContext } from "./PostBoard";
import PostDetailImg from "./PostDetailImg";
import PostDetailContent from "./PostDetailContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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

export default function PostDetail() {
  const { postDetailId, setPostDetailId } = useContext(postListContext);
  const [postData, setPostData] = useState<postData>();
  const [imgRatio, setImgRatio] = useState("");

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) setPostDetailId("");
  };

  const getPostDetailData = () => {};

  return (
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
          <PostDetailImg imgRatio={imgRatio} />
          <PostDetailContent />
        </div>
      </div>
    </div>
  );
}
