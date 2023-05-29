"use client";

import React, { useState, useEffect } from "react";
import styles from "./Floating.module.css";
import FloatingSearch from "./FloatingSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faMagnifyingGlass,
  faPencil,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import MakeModal from "./MakeModal";

export default function FloatingMenu() {
  const [searchState, setSearchState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [makeModal, setMakeModal] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {makeModal && <MakeModal closeModal={setMakeModal} />}
      <section className={styles.floatingContainer}>
        {loading && (
          <>
            <FloatingSearch
              onState={searchState}
              closeSearch={setSearchState}
            />
            <div
              className={`${styles.menuWrap} ${
                searchState && styles.menuWrapOff
              }`}
            >
              <div className={styles.logoBox}>
                {searchState ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  <img src="/assets/logo.png" />
                )}
              </div>
              <div
                className={
                  searchState ? styles.menuListBoxSearch : styles.menuListBox
                }
              >
                <article>
                  <Link href="/main">
                    <FontAwesomeIcon icon={faHouseChimney} size="lg" />
                    <p>홈</p>
                  </Link>
                  <div
                    onClick={() => {
                      setSearchState(!searchState);
                    }}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <p>검색</p>
                  </div>
                  <div onClick={() => setMakeModal(true)}>
                    <FontAwesomeIcon icon={faPencil} />
                    <p>글쓰기</p>
                  </div>
                  <Link href="/main/profile">
                    <FontAwesomeIcon icon={faUser} />
                    <p>프로필</p>
                  </Link>
                </article>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
