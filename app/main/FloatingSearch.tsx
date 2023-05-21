"use client";
import React, { useState,useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

type props = {
  onState: boolean;
  closeSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FloatingSearch({ onState, closeSearch }: props) {
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
  },[])

  return (
    <>
      {loading && (
        <div
          className={`${styles.searchWrap} ${onState && styles.searchWrapOn}`}
        >
          <span onClick={() => closeSearch(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <h2>검색</h2>
          <article className={styles.searchInput}>
            <input type="text" />
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </article>
          <article className={styles.searchContent}>
            <h3>최근 검색 항목</h3>
            <div className={styles.searchList}></div>
          </article>
        </div>
      )}
    </>
  );
}
