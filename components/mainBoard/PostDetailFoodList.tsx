import styles from "./PostDetail.module.css";

export default function PostDetailFoodList() {
  return (
    <div className={styles.food}>
      <div className={styles.foodName}>
        <p>음식이름겁나길게있는데이걸말할수있을가</p>
      </div>
      <div className={styles.foodDetail}>
        <span>100g 당</span>
        <span>1234(kcal)</span>
        <span>탄 : 23(g)</span>
        <span>단 : 40(g)</span>
        <span>지 : 5(g)</span>
        <span />
      </div>
    </div>
  );
}
