import { useEffect, useRef, useState } from "react";
import styles from "./MakeModal.module.css";

type props = {
  uploadFiles: File[];
};

export default function ModalImgPreview({ uploadFiles }: props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState<any>();
  
    useEffect(()=>{
        handleFileRead(uploadFiles[currentIndex])
    },[currentIndex])

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };
    const handleFileRead = (file:any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCurrentImage(reader.result);
        };
        reader.readAsDataURL(file);
      };

  
    return (
      <div className={styles.imageBox}>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentImage && <img src={currentImage} alt={`Image ${currentIndex}`} />}
        <button onClick={handleNext} disabled={currentIndex === uploadFiles.length - 1}>
          Next
        </button>
      </div>
    );
}
