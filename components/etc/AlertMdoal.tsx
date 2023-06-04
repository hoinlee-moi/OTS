import styles from "./alertModal.module.css";

type props = {
  closeModal: () => void;
  children: string;
  buttonFunc: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function AlertModal({
  closeModal,
  children,
  buttonFunc,
}: props) {
  return (
    <div className={styles.modalBack} onClick={closeModal}>
      <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
        <div className={styles.alertContent}>
          <p>{children}</p>
        </div>
        <div
          className={styles.checkBtn}
          onClick={(e) => buttonFunc(e)}
          id="확인"
        >
          <button>확인</button>
        </div>
        <div className={styles.cancelBtn} onClick={closeModal}>
          <button>닫기</button>
        </div>
      </div>
    </div>
  );
}
