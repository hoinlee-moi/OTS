import Avatar from '../Avatar';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  return (
    <section className={styles.sectionContainer}>
      <Avatar />
      <div className={styles.responsiveContainer}>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>유저이름</h1>
        </div>
      </div>
    </section>
  );
}
