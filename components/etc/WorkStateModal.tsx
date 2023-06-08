'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./workStateModal.module.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";


type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
};

export default function WorkStateModal({
  closeModal,
  success,
  setSuccess,
}: props) {
  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      if (success === "fail") closeModal(false);
      if (success === "success") {
        closeModal(false);
        setSuccess("close");
      }
    }
  };
  return (
    <div className={styles.modalBack} onMouseDown={mouseDownHandle}>
      <span className={styles.closeBtn} />
      <div
        className={styles.modalBody}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {success === "success" && (
          <div className={styles.success}>
            <div className={styles.successCheck}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <p>완료되었습니다!</p>
          </div>
        )}
        {success === "fail" && (
          <div className={styles.fail}>
            <div className={styles.failCheck}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <p>
              죄송합니다!
              <br /> 잠시 후 다시 시도해주세요
            </p>
          </div>
        )}
        {success === "loading" && (
          <div className={styles.ListLoading}>
            <svg>
              <circle cx="50%" cy="50%" r="25"></circle>
              <defs>
                <linearGradient id="myGradient">
                  <stop offset="0%" stopColor="#b8cbb8" />
                  <stop offset="33%" stopColor="#cf6cc9" />
                  <stop offset="66%" stopColor="#ee609c" />
                  <stop offset="100%" stopColor="#ee609c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
