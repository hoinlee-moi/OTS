import UserPosts from '@/components/profile/UserPosts';
import UserProfile from '@/components/profile/UserProfile';
import styles from './page.module.css';

export default function Profile() {
  return (
    <section className={styles.wholeContainer}>
      <UserProfile />
      <UserPosts />
    </section>
  );
}
