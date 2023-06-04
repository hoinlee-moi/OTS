"use client";

import React, { useEffect, useState } from "react";
import styles from "./postBoard.module.css";
import useObserver from "@/hooks/useObserve";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import Loading from "@/app/main/loading";
import PostItem from "./PostItem";
import { getBoardPostList } from "@/util/api";
import PostDetail from "./PostDetail";
import LoadingCircle from "../etc/LoadingCircle";
type postFile = {
  name: string;
  url: string;
};
export type post = {
  comment: number;
  file: postFile[];
  like: number;
  _id: string;
};
type boardList = post[];
export const postListContext = React.createContext<any>({});

export default function PostBoard() {
  const [postList, setPostList] = useState<boardList[]>([]);
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [pageEnd, setPageEnd] = useState(false);
  const [postDetailId,setPostDetailId] = useState("")
  const [deleteRefresh,setDeleteRefresh] = useState(false)
  const [observer, setObserver] = useObserver(
    async (entry: any, observer: any) => {
      if (page !== 1) {
        await getPostList();
      }
    },
    {}
  );
  
  useEffect(() => {
    getPostList();
  }, []);


  const getPostList = async () => {
    if (scrollLoading || pageEnd) {
      return;
    }
    setScrollLoading(true);
    try {
      const response = await getBoardPostList(page);
      if (response.status === 200) {
        if (response.data.lastPage) {
          setPageEnd(true);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
        const data = response.data.resData;
        setPostList((snap) => {
          return [...snap, ...data];
        });
      }
    } catch (error) {
      setPageEnd(true)
      console.log(error);
    }
    setTimeout(() => {
      setScrollLoading(false);
    }, 2000);
  };

  return (
    <postListContext.Provider value={{ postList,setPostList,postDetailId,setPostDetailId }}>
      {postDetailId&&<PostDetail />}
      <div className={styles.postItemWrap}>
        {postList.map((item, idx: number) => {
          let style = styles.postItemBox;
          if (idx % 2 === 0) style = styles.postItemBox2;
          return (
            <div className={style} key={idx}>
              {item.map((val) => {
                return <PostItem listItem={val} key={val._id} />;
              })}
            </div>
          );
        })}
        <div ref={setObserver} className={styles.ListLoading}>
          {pageEnd ? (
            <p>마지막 게시글입니다</p>
          ) : (
            scrollLoading && (
              <LoadingCircle/>
            )
          )}
        </div>
      </div>
    </postListContext.Provider>
  );
}
