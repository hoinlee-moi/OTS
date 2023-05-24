"use client";

import styles from "./HomeModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "./SignUp";
import Login from "./Login";

type modalPorps = {
  content: string;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HomeModal({ content, modalClose }: modalPorps) {
  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) modalClose(false);
  };

  return (
    <div className={styles.modalBackgorund} onMouseDown={mouseDownHandle}>
      <section
        className={styles.modalContent}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span onClick={() => modalClose(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        {content === "signUp" ? <SignUp /> : <Login />}
      </section>
    </div>
  );
}
