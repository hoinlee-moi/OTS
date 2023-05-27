import styles from "./MakeModal.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type foodList =
  | {
      name: string;
      gram: string;
      kcal: string;
      carbo: string;
      protien: string;
      fat: string;
    }[]
  | undefined;
type props = {
  foodList: foodList;
  setFoodList: React.Dispatch<React.SetStateAction<foodList>>;
};

export default function PostFoodList({ foodList, setFoodList }: props) {
  const listDeleteHandle = (e:React.MouseEvent<HTMLTableCellElement>) => {
    const target = e.target as HTMLElement
    const tr = target.closest("tr") as HTMLElement
    if(tr.id) {
        const newState = foodList?.filter(item=>{
            return item.name !==tr.id
        })
        setFoodList(newState)
    }
  };

  return (
    <div className={styles.foodListWrap}>
      <table>
        <tr>
          <td>음식</td>
          <td>칼로리(Kcal)</td>
          <td>탄수(g)</td>
          <td>단백(g)</td>
          <td>지방(g)</td>
          <td></td>
        </tr>
        {foodList &&
          foodList.map((item, idx) => {
            return (
              <tr id={item.name} key={idx}>
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
      </table>
    </div>
  );
}
