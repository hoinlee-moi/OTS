import { useEffect, useState } from "react";
import styles from "./PostDetail.module.css";

type props = {
  imgRatio: string;
};

export default function PostDetailImg({ imgRatio }: props) {
    const [imgState,setImgState] = useState<any>()
    useEffect(()=>{
        let style ;
        switch(imgRatio){
            case "0":style = styles.imgOriginal
            break;
            case "1/1": style = styles.imgOneOne
            break;
            case "4/5" : style = styles.imgFourFive
            break;
            case "16/9" : style = styles.imgSixteenNine
            break;
            default : style = styles.imgFourFive
        }
        setImgState(style)
    },[imgRatio])
  return (
    <div className={styles.imgWrap}>
      {!imgState ? (
        <div className={styles.loadingBox}>
          <span></span>
        </div>
      ) : (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685478353389_hf9ytp8hqz_main_food_9.jpeg?alt=media&token=a45ddf71-5454-4d41-b455-66b0c4c7d95f"
          alt=""
          className={imgState}
        />
      )}
    </div>
  );
}
