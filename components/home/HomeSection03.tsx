import React from "react";

import styles from "./homeSection03.module.css";
import ImageArray from "./ImageArray";
import SignUp from "./SignUp";

const imgArr = ["a", "b", "c", "d", "e", "f", "g"];

export default function HomeSection03() {
  return (
    <section className={styles.sectionContainer03}>
      <article className={styles.backgroundPic}>
        {imgArr.map((value) => {
          return <ImageArray props={value} order={true} key={value} />;
        })}
        <div></div>
      </article>
      <div className={styles.contentWrap}>
        <article className={styles.contentBox}>
          <div>
            <h2>
              회원 가입 하여 <br />더 많은 식단을 찾아보세요
            </h2>
          </div>
        </article>
        <article className={styles.signUpBox}>
          <SignUp />
        </article>
      </div>
    </section>
  );
}
