"use client";
import React, { useEffect, useState } from "react";
import BoardTag from "./BoardTag";
import ProfileBoard from "./ProfileBoard";
import styles from "./profile.module.css";
import { getUserPost } from "@/util/api";
import LoadingCircle from "../etc/LoadingCircle";
import useObserver from "@/hooks/useObserve";
import { post } from "../mainBoard/PostBoard";

export const userPostContext = React.createContext<any>({});

export default function BoardWrap({ param }: { param: { nickname: string } }) {
  const [pageLoading, setPageLoading] = useState(false);
  const [postId, setPostId] = useState("");
  const [userPost, setUserPost] = useState<post[]>([]);
  const [tag, setTeg] = useState("all");
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [pageEnd, setPageEnd] = useState(false);
  const [observer, setObserver] = useObserver(
    async (entry: any, observer: any) => {
      if (page !== 1) {
        getUserPostHandle();
      }
    },
    {}
  );
  useEffect(() => {
    setPageLoading(true);
  }, []);


  useEffect(() => {
    getUserPostHandle();
    setUserPost([]);
  }, [tag]);

  const getUserPostHandle = async () => {
    if (scrollLoading || pageEnd) {
      return;
    }
    setScrollLoading(true);
    try {
      const postData = {
        nickname: param.nickname,
        state: tag,
        page: page,
      };
      const response = await getUserPost(postData);
      if (response.status === 200) {
        if (response.data.lastPage) {
          setPageEnd(true);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
        const data = response.data.response;
        setUserPost((snap: post[]) => {
          return [...snap, ...data];
        });
      }
    } catch (error) {
      setPageEnd(true);
      console.log(error);
    }
    setTimeout(() => {
      setScrollLoading(false);
    }, 2000);
  };

  return (
    <userPostContext.Provider value={{ userPost, setPostId }}>
      
      {pageLoading && (
        <div className={styles.boardContainer}>
          <BoardTag setTeg={setTeg} setPageEnd={setPageEnd} setPage={setPage} />
          <ProfileBoard />
          <div ref={setObserver} className={styles.ListLoading}>
            {pageEnd ? (
              <p>마지막 게시글입니다</p>
            ) : (
              scrollLoading && <LoadingCircle />
            )}
          </div>
        </div>
      )}
    </userPostContext.Provider>
  );
}
