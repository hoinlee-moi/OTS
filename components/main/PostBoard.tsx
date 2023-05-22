import React, { useEffect, useState, useCallback } from "react";
import { getBoardPostList } from "../../api";
import useObserver from "../../hooks/useObserve";
import styles from "../../styles/board/mainBoard.module.css";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";
import Loading from "../Loading";

const MainBoard = () => {
  const [observer, setObserver] = useObserver(
    async (entry: any, observer: any) => {
      debounceHandleScroll();
    },
    {}
  );
  const [postList , setPostList] = useState()
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPostList();
  }, []);

  const debounceHandleScroll = async () => {
    await getPostList();
    await setPage((prevPage) => prevPage + 1);
  };

  const getPostList = useCallback(async () => {
    try {
      const response = await getBoardPostList(page);
      if (response.status === 200) {
        setBoardItemList((snap: any) => [...snap, ...response.data.content]);
        setPage(page + 1);
        setLoading(false);
      }
    } catch (err) {
      setLoading(true);
    }
  }, [page, boardItemList]);

  return (
    <div className={styles.postItemWrap}>
      {boardItemList.map((item, idx) => {
        let style = styles.postItemBox;
        if (idx % 2 === 0) {
          style = styles.postItemBox2;
        }
        return (
          <div className={style} key={idx}>
            {item.map((val) => {
              return <PostItem listItem={val} key={val.postId} />;
            })}
          </div>
        );
      })}
      {loading && (
        <div ref={setObserver} className={styles.ListLoading}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default MainBoard;
