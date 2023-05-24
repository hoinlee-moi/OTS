"use client";

import React, { useState } from "react";
import styles from "./SignUpBox.module.css";
import HomeModal from "./HomeModal";

export default function SignUpBox() {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const modalHandle = (e: React.MouseEvent) => {
    const name = e.target as HTMLButtonElement;
    if (name.textContent === "로그인") {
      setModalContent("login");
      setModalState(true);
      return;
    }
    if (name.textContent === "회원가입") {
      setModalContent("signUp");
      setModalState(true);
      return;
    }
  };
  return (
    <article className={styles.signUpBox}>
      <button onClick={modalHandle}>로그인</button>
      <button onClick={modalHandle}>회원가입</button>
      {modalState && (
        <HomeModal content={modalContent} modalClose={setModalState} />
      )}
    </article>
  );
}
