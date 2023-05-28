import React, { useCallback, useState } from "react";
import styles from "./MakeModal.module.css";
import ModalImage from "./ModalImage";
import AlertModal from "../etc/AlertMdoal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "./ModalContent";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export type data = {
  email: string;
  nickname: string;
  content: string;
  file: any;
  imgRatio: string;
  foodList: [];
  nuKcal: number;
  nuCarb: number;
  nuPro: number;
  nuFat: number;
};
export const newPostContext = React.createContext<any>({});

export default function MakeModal({ closeModal }: props) {
  const [postData, setPostData] = useState<data>({
    email: "",
    nickname: "",
    content: "",
    file: [],
    imgRatio: "",
    foodList: [],
    nuKcal: 0,
    nuCarb: 0,
    nuPro: 0,
    nuFat: 0,
  });
  const [modalAlert, setModalAlert] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      if (postData.file.length > 0) {
        setModalAlert(true);
        return;
      }
      closeModal(false);
    }
  };
  const backPageHandle = (e: any) => {
    if (pageIndex === 0) {
      mouseDownHandle(e);
      return;
    }
    setPageIndex(pageIndex - 1);
  };
  const nextPageHandle = (e: React.MouseEvent<HTMLParagraphElement>) => {
    let target = e.target as HTMLElement;
    if (target.textContent === "다음") {
      setPageIndex(pageIndex + 1);
      return;
    }
  };

  const closeCheckRepeat = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const div = (e.target as HTMLDivElement).closest("div");
      if (div?.id !== "확인") {
        setModalAlert(true);
        return;
      }
      setModalAlert(false);
      closeModal(false);
    },
    [modalAlert, postData]
  );

  return (
    <newPostContext.Provider value={{postData,setPostData}}>
      <div className={styles.modalBack} onMouseDown={mouseDownHandle}>
        <FontAwesomeIcon icon={faX} className={styles.closeBtn} />
        {modalAlert && (
          <AlertModal
            closeModal={() => setModalAlert(false)}
            buttonFunc={closeCheckRepeat}
          >
            글쓰기를 취소 할까요?
          </AlertModal>
        )}
        <section
          className={styles.modalContent}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.modalTitle}>
            {postData?.file.length > 0 && (
              <span onClick={backPageHandle}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            )}
            <h3>새 게시물 만들기</h3>
            {postData?.file.length > 0 && (
              <p onClick={nextPageHandle}>
                {pageIndex === 0 ? "다음" : "작성"}
              </p>
            )}
          </div>
          {pageIndex === 0 && <ModalImage />}
          {pageIndex === 1 && <ModalContent />}
        </section>
      </div>
    </newPostContext.Provider>
  );
}
