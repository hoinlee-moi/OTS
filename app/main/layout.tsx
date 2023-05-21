import FloatingMenu from "./FloatingMenu";
import styles from "./page.module.css";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div className={styles.mainContainer}>
      <FloatingMenu />
      <section className={styles.boardContainer}>{children}</section>
    </div>
  );
}
