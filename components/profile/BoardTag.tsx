import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./profile.module.css";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function BoardTag() {
  return (
    <div className={styles.boardTagWrap}>
      <button className={styles.tagClicked}>
        <FontAwesomeIcon icon={faCameraRetro} />
        게시물
      </button>
      <button>
        <FontAwesomeIcon icon={faHeart}/>
        좋아요</button>
    </div>
  );
}
