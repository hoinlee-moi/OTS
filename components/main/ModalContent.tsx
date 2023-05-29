import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MakeModal.module.css";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useAlert from "@/hooks/useAlert";
import { getFoodSearch } from "@/util/api";
import PostFoodList from "./PostFoodList";
import { data, newPostContext } from "./MakeModal";
type props = {
  setPostData: React.Dispatch<React.SetStateAction<any>>;
};
type food = {
  name: string;
  gram: string;
  kcal: string;
  carbo: string;
  protien: string;
  fat: string;
};
type foodList = food[];
type foodNu = {
  nuKcal : number
  nuCarb : number
  nuProtien : number
  nuFat : number
}
export default function ModalContent() {
  const {postData,setPostData} = useContext(newPostContext)
  const [postContent, setPostContent] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [foodSearchList, setFoodSearchList] = useState<foodList>();
  const [postInsertFood, setPostInsertFood] = useState<foodList>();
  const [foodNu,setFoodNu] = useState<foodNu>()
  const [uploadAlert, setUploadAlert] = useAlert(false);

  // useEffect(()=>{
  //   setPostData((snap:data)=>{
  //     return {...snap,}
  //   })
  // },[postInsertFood])

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      foodSearchHandle();
    }
  };
  const foodSearchHandle = async () => {
    try {
      const response = await getFoodSearch(searchInput);
      console.log(response.data)
      if (response.status === 200) {
        setFoodSearchList(response.data.foodList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const listInsertHandle = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLLIElement;
    const li = target.closest("li") as HTMLLIElement;
    if (foodSearchList) {
      const food = foodSearchList?.filter((item) => {
        return item.name === li.id;
      })[0];
      postInsertfood(food);
    }
    console.log(postInsertFood);
  };
  const postInsertfood = (food: food) => {
    if(postInsertFood) {
      if(postInsertFood.length >=8) {
        setUploadAlert()
        return
      }
    }
    setPostInsertFood((snap) => {
      if (snap) {
        const newState = [...snap];
        newState.push(food);
        return newState;
      } else {
        return [food];
      }
    });
  };

  return (
    <div className={styles.contentContainer}>
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
          <ul onClick={listInsertHandle}>
            {foodSearchList &&
              foodSearchList.map((item, idx) => {
                return (
                  <li key={idx} id={item.name}>
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
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <textarea
            name="content"
            placeholder="식단 소개..."
            maxLength={300}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <span>{postContent.length}/300</span>
        </div>
        <PostFoodList
          foodList={postInsertFood}
          setFoodList={setPostInsertFood}
        />
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
