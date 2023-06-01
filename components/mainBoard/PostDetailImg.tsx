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
            default : style = styles.imgOriginal
        }
        setImgState(style)
    },[imgRatio])
    console.log(imgState)
  return (
    <div className={styles.imgWrap}>
      {!imgState ? (
        <div className={styles.loadingBox}>
          <span></span>
        </div>
      ) : (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/myots-c8287.appspot.com/o/board%2F1685478354350_znr22hoa44_main_food_11.jpeg?alt=media&token=9f4f7d49-4223-4b9b-a7cb-7844d3e91a02"
          alt=""
          className={imgState}
        />
      )}
    </div>
  );
}
