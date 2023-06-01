import { useContext, useState } from "react";
import styles from "./PostDetail.module.css";
import { foodList } from "../main/MakeModal";
import { postListContext } from "./PostBoard";
import PostDetailImg from "./PostDetailImg";
import PostDetailContent from "./PostDetailContent";

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
      <div
        className={styles.modalBody}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <PostDetailImg imgRatio={imgRatio} />
        <PostDetailContent />
      </div>
    </div>
  );
}
