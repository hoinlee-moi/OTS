import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./profile.module.css";
import { faCameraRetro, faPencil } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

type props = {
  setTeg: React.Dispatch<React.SetStateAction<string>>;
  setPageEnd:React.Dispatch<React.SetStateAction<boolean>>
  setPage:React.Dispatch<React.SetStateAction<number>>
};

export default function BoardTag({ setTeg,setPageEnd,setPage }: props) {
  const [click, setClick] = useState(0);

  const btnClickHandle = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === "all") {
      setClick(0);
      setPageEnd(false)
      setPage(1)
      setTeg("all");
      return;
    }
    setClick(1);
    setPageEnd(false)
    setPage(1)
    setTeg("com");
  };
  return (
    <div className={styles.boardTagWrap}>
      <button
        id="all"
        className={click === 0 ? styles.tagClicked : ""}
        onClick={btnClickHandle}
      >
        <FontAwesomeIcon icon={faCameraRetro} />
        게시물
      </button>
      <button
        id="com"
        className={click === 1 ? styles.tagClicked : ""}
        onClick={btnClickHandle}
      >
        <FontAwesomeIcon icon={faPencil} />
        댓글게시물
      </button>
    </div>
  );
}
