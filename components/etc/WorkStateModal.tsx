import styles from "./WorkStateModal.module.css";

export default function WorkStateModal() {
  return (
    <div className={styles.modalBack}>
      <div className={styles.modalBody}>
        <div className={styles.ListLoading}>
          <svg>
            <circle cx="50%" cy="50%" r="50"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
