import styles from "../page.module.css";
export default function Loading() {
  return (
    <div className={styles.ListLoading}>
      <svg>
        <circle cx="50%" cy="50%" r="25"></circle>
      </svg>
    </div>
  );
}
