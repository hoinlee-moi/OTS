import LoadingCircle from "@/components/etc/LoadingCircle";
import styles from "./page.module.css";
export default function Loading() {
  return (
    <div className={styles.ListLoading}>
      <LoadingCircle />
    </div>
  );
}