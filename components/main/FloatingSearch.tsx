"use client";
import React, { useState, useEffect } from "react";
import styles from "./floating.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type props = {
  onState: boolean;
  closeSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
type search = {
  time: number;
  search: string;
};
type searchList = search[];

export default function FloatingSearch({ onState, closeSearch }: props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState<searchList>([]);

  useEffect(() => {
    setLoading(true);
    getSearchHistory();
  }, []);

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchProfileHandle();
  };
  const getSearchHistory = () => {
    if (localStorage.getItem("searchHistory")) {
      const searchHistory: any = localStorage.getItem("searchHistory");
      const histroyArr = JSON.parse(searchHistory);
      setSearchList(histroyArr);
    }
  };
  const searchProfileHandle = () => {
    if (searchInput.trim().length < 1) return;
    const search = {
      search: searchInput,
      time: new Date().getTime(),
    };
    const fiterList = searchList.filter((item) => {
      return item.search !== search.search;
    });
    const newList = [...fiterList, search];
    newList.sort((a: search, b: search) => {
      return b.time - a.time;
    });
    setSearchList(newList);
    localStorage.setItem("searchHistory", JSON.stringify(newList));
    router.push(`/main/profile/${searchInput}`);
  };

  const deleteListHandle = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const target = e.target as HTMLElement;
    const liTarget = target.closest("li");
    if (liTarget) {
      liTarget.style.transform = "translateY(-100%)"
      liTarget.style.opacity = "0";
      setTimeout(() => {
        const newList = searchList.filter((item) => {
          return item.search !== liTarget?.id;
        });
        setSearchList(newList);
        localStorage.setItem("searchHistory", JSON.stringify(newList));
      }, 400);
    }
  };

  const liClickHandle = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const id = target.id;
    console.log(target.tagName)
    if (target.tagName === "LI") {
      router.push(`/main/profile/${id}`);
    }
  };

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
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={keyDownHandle}
            />
            <span onClick={searchProfileHandle}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </article>
          <article className={styles.searchContent}>
            <h3>최근 검색 항목</h3>
            <div className={styles.searchList}>
              <ul>
                {searchList.length > 0 ? (
                  searchList.map((item) => {
                    return (
                      <li
                        id={item.search}
                        key={item.time}
                        onClick={liClickHandle}
                      >
                        {item.search}
                        <FontAwesomeIcon
                          icon={faX}
                          onClick={deleteListHandle}
                        />
                      </li>
                    );
                  })
                ) : (
                  <p>최근 검색어가 없습니다</p>
                )}
              </ul>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
