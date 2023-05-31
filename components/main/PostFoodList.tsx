import styles from "./MakeModal.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { newPostData, food, newPostContext } from "./MakeModal";

type foodNu = {
  kcal: number;
  carbo: number;
  protien: number;
  fat: number;
};

export default function PostFoodList() {
  const { postData, setPostData } = useContext(newPostContext);
  const listDeleteHandle = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const target = e.target as HTMLElement;
    const tr = target.closest("tr") as HTMLElement;
    if (tr.id) {
      const newState = postData.foodList?.filter((item: any, idx: any) => {
        return idx.toString() !== tr.id;
      });
      setPostData((snap: newPostData) => {
        return {
          ...snap,
          foodList: newState,
        };
      });
    }
  };
  useEffect(() => {
    if (postData.foodList.length > 0) {
      const nutrient: foodNu = postData.foodList.reduce(
        (acc: food, cur: food) => {
          return {
            kcal: acc.kcal + cur.kcal,
            carbo: acc.carbo + cur.carbo,
            protien: acc.protien + cur.protien,
            fat: acc.fat + cur.fat,
          };
        },
        { kcal: 0, carbo: 0, protien: 0, fat: 0 }
      );
      setPostData((snap: newPostData) => {
        return {
          ...snap,
          nuKcal: nutrient.kcal,
          nuCarb: nutrient.carbo,
          nuPro: nutrient.protien,
          nuFat: nutrient.fat,
        };
      });
    }
  }, [postData.foodList]);
  return (
    <div className={styles.foodListWrap}>
      <div className={styles.list}>
        <table>
          <thead>
            <tr>
              <td>음식</td>
              <td>칼로리(Kcal)</td>
              <td>탄수(g)</td>
              <td>단백(g)</td>
              <td>지방(g)</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {postData.foodList &&
              postData.foodList.map((item: any, idx: any) => {
                return (
                  <tr id={idx.toString()} key={idx}>
                    <td>{item.name}</td>
                    <td>
                      {item.kcal}
                      <span>{`(${item.gram}g)`}</span>
                    </td>
                    <td>{item.carbo}g</td>
                    <td>{item.protien}g</td>
                    <td>{item.fat}g</td>
                    <td onClick={listDeleteHandle}>
                      <span>
                        <FontAwesomeIcon icon={faX} />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className={styles.calNuWrap}>
        <p>총량</p>
        <p>{postData.foodList.length===0?0:postData.nuKcal}</p>
        <p>{postData.foodList.length===0?0:postData.nuCarb}</p>
        <p>{postData.foodList.length===0?0:postData.nuPro}</p>
        <p>{postData.foodList.length===0?0:postData.nuFat}</p>
        <p></p>
      </div>
    </div>
  );
}
