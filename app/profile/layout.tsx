import styles from './page.module.css';
import FloatingMenu from '@/components/main/FloatingMenu';

type props = {
  children: React.ReactNode;
};

export default function profileLayout({ children }: props) {
  return (
    <div className={styles.mainContainer}>
      <FloatingMenu />
      <section className={styles.boardContainer}>{children}</section>
    </div>
  );
}
