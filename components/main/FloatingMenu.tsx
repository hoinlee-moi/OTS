"use client";

import React, { useState, useEffect } from "react";
import styles from "./floating.module.css";
import FloatingSearch from "./FloatingSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faHouseChimney,
  faMagnifyingGlass,
  faPencil,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import MakeModal from "./MakeModal";
import { signOut } from "next-auth/react";

export default function FloatingMenu() {
  const [searchState, setSearchState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [makeModal, setMakeModal] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const logoutHandle = () => {};

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
                  <Link href="/main" prefetch={false} >
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
                  <Link href="/main/profile" prefetch={false} >
                    <FontAwesomeIcon icon={faUser} />
                    <p>프로필</p>
                  </Link>
                  <div onClick={() => signOut()}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <p>로그아웃</p>
                  </div>
                </article>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
