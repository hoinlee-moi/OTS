import React from "react";
import styles from "./MakeModal.module.css";
import ModalImage from "./ModalImage";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MakeModal({ closeModal }: props) {


  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) closeModal(false);
  };
  
  return (
    <div className={styles.modalBack} onMouseDown={mouseDownHandle}>
      <section
        className={styles.modalContent}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.modalTitle}>
          <h3>새 게시물 만들기</h3>
        </div>
        <ModalImage />
      </section>
    </div>
  );
}
