import UserPosts from '@/components/profile/UserPosts';
import UserProfile from '@/components/profile/UserProfile';
import styles from './profile.module.css';

export default function Profile() {
  return (
    <section className={styles.wholeContainer}>
      <UserProfile />
      <UserPosts />
    </section>
  );
}
