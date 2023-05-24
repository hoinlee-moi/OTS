import React from "react";
import styles from "./MakeModal.module.css";
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
      ></section>
    </div>
  );
}
