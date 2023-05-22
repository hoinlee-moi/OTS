import styles from './PostGrid.module.css';
import PostGridCard from './PostGridCard';

export default function PostGrid() {
  return (
    <div className={styles.gridContainer}>
      <ul className={styles.gridPosts}>
        <PostGridCard />
      </ul>
    </div>
  );
}
