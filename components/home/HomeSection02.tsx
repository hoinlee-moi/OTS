'use client'
import React from "react";
import styles from "./HomeSection02.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function HomeSection02() {
  const imgArr = [12, 13, 14, 15];
  return (
    <section className={styles.sectionContainer02}>
      <article>
        <div className={styles.imgBox}>
          <div>
            {imgArr.map((val) => {
              return (
                <img src={`/assets/main/main_food_${val}.jpeg`} key={val} />
              );
            })}
            <div className={styles.imgBoxContent}>
              <p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                다이어트 도움되는 점심 식단{" "}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.contentBox}>
          <div>
            <p>식단 검색</p>
            <p>
              다이어트를 시작했는데 뭘 먹어야 할 지 잘 모르겠다고요? <br /> 음식
              칼로리를 검색하고 결과를 확인해 보세요
            </p>
            <button>찾아보기</button>
          </div>
        </div>
      </article>
    </section>
  );
}
