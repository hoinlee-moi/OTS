import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import styles from "./PostDetail.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function PostDetailContent() {
  return (
    <div className={styles.contentWrap}>
      <div className={styles.postUserWrap}>
        <div>
          <Avatar image="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685551914293_hfa0542lf5_main_info_4.jpg?alt=media&token=4277c401-820b-49b6-8c1c-7a157f97116d" />
        </div>
        <p>유저아이디</p>
      </div>
      <div className={styles.postContentWrap}>
        <div className={styles.postContent}>
          <p>내용</p>
        </div>
      </div>
      <div className={styles.foodListWrap}>
        <div className={styles.food}>
          <span className={styles.foodName}>
            음식이름겁나길게있는데이걸말할수있을가<span>(100g)</span>
          </span>
          <div>
            <span>1234(kcal)</span>
            <span>탄 : 23(g)</span>
            <span>단 : 40(g)</span>
            <span>지 : 5(g)</span>
            <span />
          </div>
        </div>
        <div className={styles.food}>
          <span className={styles.foodName}>
            음식이름<span>(100g)</span>
          </span>
          <div>
            <span>1234(kcal)</span>
            <span>탄 : 23(g)</span>
            <span>단 : 40(g)</span>
            <span>지 : 5(g)</span>
            <span />
          </div>
        </div>
      </div>
      <div>
        <div>
          <input type="text" />
        </div>
        <div>
          <Avatar image="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685551914293_hfa0542lf5_main_info_4.jpg?alt=media&token=4277c401-820b-49b6-8c1c-7a157f97116d" />
          <p>댓글</p>
        </div>
      </div>
    </div>
  );
}
