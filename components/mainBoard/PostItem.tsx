'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./postBoard.module.css";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { post } from "./PostBoard";

import Image from "next/image";
import React from "react";

type props = {
  listItem: post;
};

 const PostItem=({ listItem }: props)=> {
  return (
    <>
      <Image
        src={listItem.file[0].url}
        alt=""
        priority
        fill
        sizes="(max-width:300px),(max-height:600px)"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fPl8PQAH7AL2dy8SSgAAAABJRU5ErkJggg=="
      />
      <div className={styles.hoverDetail}>
        <div>
          <FontAwesomeIcon icon={faComment} />
          <p>
            {listItem.comment >= 10000
              ? `${Math.floor((listItem.comment / 10000) * 10) / 10}만`
              : listItem.comment}
          </p>
        </div>
      </div>
    </>
  );
}
export default React.memo(PostItem)
