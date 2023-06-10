"use client";

import React, { useRef, useEffect, useState, MouseEventHandler } from "react";
import styles from "@/app/page.module.css";
import HomeSection01 from "./HomeSection01";
import HomeSection02 from "./HomeSection02";
import HomeSection03 from "./HomeSection03";

export default function Sections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      if (isScrolling) return;
      setIsScrolling(true);
      const { deltaY } = e;
      if (containerRef.current) {
        const { scrollTop } = containerRef.current;
        const pageHeight = window.innerHeight;
        if (deltaY > 0) {
          if (scrollTop === pageHeight * 2) {
            scrollEnd(false);
            return;
          }
          containerRef.current.scrollTo({
            top: pageHeight * (Math.floor(scrollTop / pageHeight) + 1),
            behavior: "smooth",
          });
        } else {
          if (scrollTop === 0) {
            scrollEnd(false);
            return;
          }
          containerRef.current.scrollTo({
            top: scrollTop - pageHeight,
            left: 0,
            behavior: "smooth",
          });
        }
        scrollEnd(true);
      }
    };
    const containerRefCurrent = containerRef.current;
    containerRefCurrent?.addEventListener("wheel", wheelHandler);
    containerRefCurrent?.addEventListener("touchstart", wheelHandler);
    containerRefCurrent?.addEventListener("touchmove", wheelHandler);
    return () => {
      containerRefCurrent?.removeEventListener("wheel", wheelHandler);
      containerRefCurrent?.removeEventListener("touchstart", wheelHandler);
      containerRefCurrent?.removeEventListener("touchmove", wheelHandler);
    };
  }, [isScrolling]);

  // useEffect(() => {
  //   const touchStartHandler = (e: TouchEvent) => {
  //     setTouchStartY(e.touches[0].clientY);
  //   };

  //   const touchMoveHandler = (e: TouchEvent) => {
  //     e.preventDefault();
  //     if (isScrolling) return;
  //     setIsScrolling(true);

  //     const touchCurrentY = e.touches[0].clientY;
  //     const touchDeltaY = touchStartY - touchCurrentY;
  //     const pageHeight = window.innerHeight;

  //     if (containerRef.current) {
  //       const { scrollTop } = containerRef.current;
  //       if (touchDeltaY > 0) {
  //         if (scrollTop === pageHeight * 2) {
  //           scrollEnd(false);
  //           return;
  //         }
  //         containerRef.current.scrollTo({
  //           top: pageHeight * (Math.floor(scrollTop / pageHeight) + 1),
  //           behavior: "smooth",
  //         });
  //       } else {
  //         if (scrollTop === 0) {
  //           scrollEnd(false);
  //           return;
  //         }
  //         containerRef.current.scrollTo({
  //           top: scrollTop - pageHeight,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       }
  //       scrollEnd(true);
  //     }
  //   };

  //   const containerRefCurrent = containerRef.current;
  //   containerRefCurrent?.addEventListener("touchstart", touchStartHandler);
  //   containerRefCurrent?.addEventListener("touchmove", touchMoveHandler);
  //   return () => {
  //     containerRefCurrent?.removeEventListener("touchstart", touchStartHandler);
  //     containerRefCurrent?.removeEventListener("touchmove", touchMoveHandler);
  //   };
  // }, [ touchStartY]);

  const scrollEnd = (bool: boolean) => {
    if (bool) {
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
      return;
    }
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button === 1) e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
    >
      <HomeSection01 />
      <HomeSection02 />
      <HomeSection03 />
    </div>
  );
}
