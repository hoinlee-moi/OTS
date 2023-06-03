import { useContext, useEffect, useRef, useState } from "react";
import styles from "./PostDetail.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LoadingCircle from "../etc/LoadingCircle";
import { detailPostDataContext } from "./PostDetail";

export default function PostDetailImg() {
  const { postData } = useContext(detailPostDataContext);
  const [imgState, setImgState] = useState<any>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const [image, setImage] = useState<any>();

  useEffect(() => {
    let style;
    if (postData) {
      switch (postData.imgRatio) {
        case "0":
          style = styles.imgOriginal;
          break;
        case "1/1":
          style = styles.imgOneOne;
          break;
        case "4/5":
          style = styles.imgFourFive;
          break;
        case "16/9":
          style = styles.imgSixteenNine;
          break;
        default:
          style = styles.imgOneOne;
      }
      setImgState(style);
    }
  }, [postData]);

  useEffect(() => {
    if (postData) imgUp();
  }, [currentIndex, postData]);

  const handlePrevious = () => {
    setImgLoading(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setImgLoading(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const imgUp = () => {
    setImgLoading(false);
    setImage(postData.file[currentIndex].url);
  };

  return (
    <div className={styles.imgWrap}>
      {postData && (
        <div className={styles.nutrient}>
          <ul>
            <li>총합</li>
            <li>칼로리 : {postData.nuKcal}</li>
            <li>탄수화물 : {postData.nuCarb}</li>
            <li>단백질 : {postData.nuPro}</li>
            <li>지방 : {postData.nuFat}</li>
          </ul>
        </div>
      )}
      {imgLoading ? (
        <div className={styles.loading}>
          <LoadingCircle />
        </div>
      ) : (
        image && (
          <>
            <Image
              src={image}
              alt={`Image ${currentIndex}`}
              className={imgState}
              width={1000}
              height={1000}
              ref={imgRef}
              priority
            />
            {currentIndex !== 0 && (
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={styles.leftBtn}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            )}
            {image && currentIndex !== postData.file.length - 1 && (
              <button
                onClick={handleNext}
                disabled={image && currentIndex === postData.file.length - 1}
                className={styles.rightBtn}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            )}
          </>
        )
      )}
    </div>
  );
}
