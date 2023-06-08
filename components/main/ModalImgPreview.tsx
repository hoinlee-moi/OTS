'use client'
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./makeModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ImageResize from "./ImageResize";
import { newPostContext } from "./MakeModal";

type props = {
  uploadFiles: File[];
};

export default function ModalImgPreview({ uploadFiles }: props) {
  const { postData, setPostData } = useContext(newPostContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<any>();
  const [imageSize, setImageSize] = useState("");

  useEffect(() => {
    if (postData.imgRatio !== "1/1") {
      setImageSize(postData.imgRatio);
    }
  }, []);

  useEffect(() => {
    handleFileRead(uploadFiles[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const imgCurRef = imgRef.current;
    if (imgCurRef) {
      if (imageSize === "0") {
        imgCurRef.style.width = "100%";
        imgCurRef.style.height = "100%";
        imgCurRef.style.objectFit = "contain";
      }
      if (imageSize === "1/1") {
        imgCurRef.style.width = "100%";
        imgCurRef.style.height = "100%";
        imgCurRef.style.objectFit = "cover";
      }
      if (imageSize === "4/5") {
        imgCurRef.style.width = "calc(100% * 4/5)";
        imgCurRef.style.height = "100%";
        imgCurRef.style.objectFit = "cover";
      }
      if (imageSize === "16/9") {
        imgCurRef.style.width = "100%";
        imgCurRef.style.height = "calc(100% * 9/16)";
        imgCurRef.style.objectFit = "cover";
      }
      setPostData((snap: any) => {
        return { ...snap, imgRatio: imageSize };
      });
    }
  }, [imageSize]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handleFileRead = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.imageBox}>
      {uploadFiles.length > 0 && (
        <>
          <ImageResize setImageSize={setImageSize} />
          {currentIndex !== 0 && (
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={styles.leftBtn}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          )}
          {currentIndex !== uploadFiles.length - 1 && (
            <button
              onClick={handleNext}
              disabled={currentIndex === uploadFiles.length - 1}
              className={styles.rightBtn}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          )}
        </>
      )}
      <img src={currentImage} alt={`Image ${currentIndex}`} ref={imgRef} />
    </div>
  );
}
