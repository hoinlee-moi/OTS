import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./postBoard.module.css";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { post, postListContext } from "./PostBoard";
import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";

type props = {
  listItem: post;
};

export default function PostItem({ listItem }: props) {
  const { setPostDetailId } = useContext(postListContext);

  return (
    <div
      className={styles.postItem}
      onClick={() => setPostDetailId(listItem._id)}
    >
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
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <p>
            {listItem.like >= 10000
              ? `${Math.floor((listItem.like / 10000) * 10) / 10}만`
              : listItem.like}
          </p>
        </div>
      </div>
    </div>
  );
}
