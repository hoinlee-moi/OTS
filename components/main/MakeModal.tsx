import React, { useCallback, useEffect, useState } from "react";
import styles from "./makeModal.module.css";
import ModalImage from "./ModalImage";
import AlertModal from "../etc/AlertMdoal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "./ModalContent";
import { createPostWrite } from "@/util/api";
import { fileDelete, fileUpload } from "@/util/firebase";
import WorkStateModal from "../etc/WorkStateModal";
import { postData } from "../mainBoard/PostDetail";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export type food = {
  name: string;
  gram: string;
  kcal: string;
  carbo: string;
  protien: string;
  fat: string;
};
export type foodList = food[];

export type newPostData = {
  content: string;
  file: any;
  imgRatio: string;
  foodList: foodList;
  nuKcal: number;
  nuCarb: number;
  nuPro: number;
  nuFat: number;
};

export const newPostContext = React.createContext<any>({});

export default function MakeModal({ closeModal }: props) {
  const [postData, setPostData] = useState<newPostData>({
    content: "",
    file: [],
    imgRatio: "1/1",
    foodList: [],
    nuKcal: 0,
    nuCarb: 0,
    nuPro: 0,
    nuFat: 0,
  });
  const [modalAlert, setModalAlert] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [debounce, setDebounce] = useState(false);
  const [writeState, setWriteState] = useState(false);
  const [success, setSuccess] = useState("loading");

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `
      background-color: #f6f6f6;
      min-height: 100vh;
      margin: 0;
      line-height: 1;`;
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);



  useEffect(() => {
    if (success === "close") closeModal(false);
  }, [success]);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (writeState) {
      return;
    }
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

  const createPostHandle = async () => {
    if (debounce) {
      return;
    }
    setWriteState(true);
    setDebounce(true);
    if (postData.file.length > 0) {
      const fileUrlArray = await fileUpload(postData.file, "board");
      if (fileUrlArray.length > 0) {
        const newPostData = {
          ...postData,
          file: fileUrlArray,
        };
        try {
          const response = await createPostWrite(newPostData);
          if (response.status === 201) {
            setSuccess("success");
            // 프로필 페이지로 이동해서 작성 한 글 보여주기
          }
        } catch (error) {
          console.log(error);
          await fileDelete(newPostData.file, "board");
          setSuccess("fail");
        }
      } else {
        alert("서버와의 연결이 올바르지 않습니다. 잠시후 다시 시도해주세요");
      }
    }
    setDebounce(false);
  };

  return (
    <newPostContext.Provider value={{ postData, setPostData }}>
      <div className={styles.modalBack} onMouseDown={mouseDownHandle}>
        {writeState && (
          <WorkStateModal
            closeModal={setWriteState}
            success={success}
            setSuccess={setSuccess}
          />
        )}
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
            {postData?.file.length > 0 ? (
              pageIndex === 0 ? (
                <p onClick={nextPageHandle}>다음</p>
              ) : (
                <p onClick={createPostHandle}>작성</p>
              )
            ) : (
              <></>
            )}
          </div>
          {pageIndex === 0 && <ModalImage />}
          {pageIndex === 1 && <ModalContent />}
        </section>
      </div>
    </newPostContext.Provider>
  );
}
