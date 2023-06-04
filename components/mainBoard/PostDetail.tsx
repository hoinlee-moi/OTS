import React, { useContext, useEffect, useState } from "react";
import styles from "./postDetail.module.css";
import { foodList } from "../main/MakeModal";
import { postListContext } from "./PostBoard";
import PostDetailImg from "./PostDetailImg";
import PostDetailContent from "./PostDetailContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { deletePost, getPostDetail } from "@/util/api";
import { useSession } from "next-auth/react";

type file = {
  name: string;
  url: string;
};

type postData = {
  content: string;
  file: file[];
  imgRatio: string;
  foodList: foodList;
  nuKcal: number;
  nuCarb: number;
  nuPro: number;
  nuFat: number;
  like: number;
  comment: number;
  userId: string;
  userProfile: string;
  _id: string;
};

export const detailPostDataContext = React.createContext<any>({});

export default function PostDetail() {
  const { postDetailId, setPostDetailId, setPostList } =
    useContext(postListContext);
  const { data }: any = useSession();
  const [postData, setPostData] = useState<postData>();
  const [userPost, setUserPost] = useState(false);
  const [deleteState,setDeleteState] = useState(false)

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

  useEffect(() => {
    if (data.user._id === postData?.userId) setUserPost(true);
    else setUserPost(false);
  }, [postData]);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) setPostDetailId("");
  };

  const getPostDetailData = async () => {
    try {
      const response = await getPostDetail(postDetailId);
      if (response.status === 200) {
        setPostData(response.data);
        window.location.reload()
      }
    } catch (error) {
      alert("서버와의 접속이 올바르지 않습니다");
      setPostDetailId("");
    }
  };

  const deletePostHandle = async () => {
    if(deleteState) return;
    if (window.confirm("삭제하시겠습니까?")) {
      if (postData) {
        setDeleteState(true)
        const deleteData = {
          postId : postData._id,
          userId: postData.userId,
        };
        try {
          const response = await deletePost(deleteData);
          setDeleteState(false)
          if (response.status === 200) {
            setPostDetailId("");
          }
        } catch (error) {
          setDeleteState(false)
        }
      }
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
            {userPost && (
              <div className={styles.postEditBtn}>
                <button>수정</button>
                <button onClick={deletePostHandle} disabled={deleteState}>삭제</button>
              </div>
            )}
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
