'use client'
import { useContext } from "react";
import styles from "./postDetail.module.css";
import { detailPostDataContext } from "./PostDetail";
import { food } from "../main/MakeModal";

export default function PostDetailFoodList() {
  const { postData } = useContext(detailPostDataContext);

  return (
    <>
      {postData &&
        postData.foodList.map((item: food,idx:number) => {
          return (
            <div className={styles.food} key={idx}>
              <div className={styles.foodName}>
                <p>{item.name}</p>
              </div>
              <div className={styles.foodDetail}>
                <span>{item.gram}g 당</span>
                <span>{item.kcal}(kcal)</span>
                <span>탄 : {item.carbo}(g)</span>
                <span>단 : {item.protien}(g)</span>
                <span>지 : {item.fat}(g)</span>
                <span />
              </div>
            </div>
          );
        })}
    </>
  );
}
