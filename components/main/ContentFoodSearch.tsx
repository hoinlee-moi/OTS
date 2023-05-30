import { getFoodSearch } from "@/util/api";
import styles from "./MakeModal.module.css";
import { useContext, useState } from "react";
import { food, foodList, newPostContext, newPostData } from "./MakeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useAlert from "@/hooks/useAlert";
import Loading from "@/app/loading";

export default function ContentFoodSearch() {
  const { postData, setPostData } = useContext(newPostContext);
  const [searchInput, setSearchInput] = useState("");
  const [foodSearchList, setFoodSearchList] = useState<foodList>();
  const [uploadAlert, setUploadAlert] = useAlert(false);
  const [debounce, setDebounce] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceTimeOut = (time: number) => {
    setTimeout(() => {
      setDebounce(false);
    }, time);
  };

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      foodSearchHandle();
    }
  };

  const foodSearchHandle = async () => {
    setSearchLoading(true);
    if (debounce) return;
    setDebounce(true);
    try {
      const response = await getFoodSearch(searchInput);
      if (response.status === 200) {
        setSearchLoading(false);
        setFoodSearchList(response.data.foodList);
      }
    } catch (error) {
      console.log(error);
      setSearchLoading(false);
    }
    debounceTimeOut(3000);
  };
  const postInsertfood = (food: food) => {
    if (postData.foodList) {
      if (postData.foodList.length >= 8) {
        setUploadAlert();
        return;
      }
    }

    setPostData((snap: newPostData) => {
      if (snap.foodList.length > 0) {
        const newState = [...snap.foodList];
        newState.push(food);
        return {
          ...snap,
          foodList: newState,
        };
      } else {
        return {
          ...snap,
          foodList: [food],
        };
      }
    });
  };

  const listInsertHandle = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    if (debounce) return;

    setDebounce(true);
    const target = e.target as HTMLLIElement;
    const li = target.closest("li") as HTMLLIElement;
    if (foodSearchList) {
      const food = foodSearchList?.filter((item, idx) => {
        return idx.toString() === li.id;
      })[0];
      postInsertfood(food);
    }
    debounceTimeOut(1000);
  };

  return (
    <div className={styles.searchWrap}>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="음식 검색.."
          name="foodSearch"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={keyDownHandle}
        />
        <span onClick={foodSearchHandle}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
      <div className={styles.searchList}>
        <h3>목록</h3>
        {searchLoading && (
          <div className={styles.loadingBox}>
            <span></span>
          </div>
        )}

        <ul onClick={listInsertHandle}>
          {foodSearchList &&
            foodSearchList.map((item, idx) => {
              return (
                <li key={idx} id={idx.toString()}>
                  {item.name}
                  <p>
                    {`${item.kcal}kcal`}
                    <span>{`(${item.gram}g)`}</span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <div
        className={`${styles.uploadAlert} ${
          uploadAlert && styles.uploadAlertOff
        }`}
      >
        <p>음식개수는 총 8개까지 가능합니다</p>
      </div>
    </div>
  );
}
