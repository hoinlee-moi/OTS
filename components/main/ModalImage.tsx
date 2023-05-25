import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MakeModal.module.css";
import { faImages, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import useFileUpload from "@/hooks/useFileUpload";
import useAlert from "@/hooks/useAlert";
import ModalImgPreview from "./ModalImgPreview";
import { FontawesomeObject } from "@fortawesome/fontawesome-svg-core";

export default function ModalImage() {
  const [uploadedImages, setUploadedImages] = useFileUpload({
    list: [],
    max: 3,
  });
  const [uploadAlert, setUploadAlert] = useAlert(false);
  const dragHover = useRef<SVGSVGElement>(null);
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const changeHandler = (e: any) => {
      const files = e.target.files;
      if (files.length > 3 || uploadedImages.length > 2) {
        setUploadAlert();
        return;
      }
      setUploadedImages(files);
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer !== null) {
        const files = e.dataTransfer.files;
        if (files.length > 3 || uploadedImages.length > 2) {
          setUploadAlert();
          return;
        }
        setUploadedImages(files);
      }
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (uploadBoxRef.current && dragHover.current) {
        uploadBoxRef.current.style.backgroundColor = "#f4f4f4";
        dragHover.current.style.color = "#e45988";
      }
    };
    const dragLeaveHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (uploadBoxRef.current && dragHover.current) {
        uploadBoxRef.current.style.backgroundColor = "#fff";
        dragHover.current.style.color = "#000";
      }
    };
    uploadBox?.addEventListener("drop", dropHandler);
    uploadBox?.addEventListener("dragover", dragOverHandler);
    uploadBox?.addEventListener("dragleave", dragLeaveHandler);
    input?.addEventListener("change", changeHandler);

    return () => {
      uploadBox?.removeEventListener("drop", dropHandler);
      uploadBox?.removeEventListener("dragover", dragOverHandler);
      input?.removeEventListener("change", changeHandler);
    };
  }, [uploadedImages]);
  return (
    <label
      htmlFor="fileUpload"
      className={styles.imgContainer}
      ref={uploadBoxRef}
    >
      <div className={styles.imgWrap}>
        {uploadedImages.length > 0 ? (
          <ModalImgPreview uploadFiles={uploadedImages} />
        ) : (
          <div className={styles.dragUploadBox}>
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={faImages} ref={dragHover} />
            </div>
            <div className={styles.textBox}>
              <h3>사진을 이곳에 끌어다 놓으세요</h3>
            </div>
          </div>
        )}
        <label
          htmlFor="fileUpload"
          className={
            uploadedImages.length < 1
              ? styles.fileUploadLabel
              : styles.uploadLabelChange
          }
        >
          {uploadedImages.length < 1 ? (
            "컴퓨터에서 선택"
          ) : (
            <FontAwesomeIcon icon={faPlusSquare} />
          )}
        </label>
        <span>최대 3장</span>
        <input
          className={styles.uploadInput}
          type="file"
          id="fileUpload"
          multiple
          accept="image/*"
          ref={inputRef}
        />

        <div
          className={`${styles.uploadAlert} ${
            uploadAlert && styles.uploadAlertOff
          }`}
        >
          <p>이미지는 최대 3장까지만 가능합니다</p>
        </div>
      </div>
    </label>
  );
}
