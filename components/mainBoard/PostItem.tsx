import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PostBoard.module.css"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { post } from "./PostBoard";

type props ={
    listItem : post
}

export default function PostItem({listItem}:props) {
  return (
    <div className={styles.postItem} >
      <img src={listItem.file[0].url} alt="" />
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
