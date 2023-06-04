import React, { useEffect, useState } from "react";
import styles from "./makeModal.module.css";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

type props = {
  setImageSize: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageResize({ setImageSize }: props) {
  const [sizeBtn, setSizeBtn] = useState(false);
  const [liStyle,setLiStyle] = useState("")

  const clickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLLIElement;
    const li = target.closest("li") as HTMLLIElement
    setImageSize(li.id)
    setLiStyle(li.id)
  };


  return (
    <div
      className={styles.resizeBtn}
      onClick={() => {
        setSizeBtn(!sizeBtn);
      }}
    >
      {sizeBtn && (
        <ul className={styles.sizeBtnWrap} onClick={clickHandler}>
          <li id="0" className={`${liStyle==="0"&&styles.clickLi}`}>
            원본
            <FontAwesomeIcon icon={faImage} />
          </li>
          <li id="1/1" className={`${liStyle==="1/1"&&styles.clickLi}`}>
            1 : 1<span />
          </li>
          <li id="4/5" className={`${liStyle==="4/5"&&styles.clickLi}`}>
            4 : 5<span />
          </li>
          <li id="16/9" className={`${liStyle==="16/9"&&styles.clickLi}`}>
            16 : 9<span />
          </li>
        </ul>
      )}

      <div>
        <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
      </div>
    </div>
  );
}
