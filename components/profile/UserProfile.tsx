import Avatar from '../Avatar';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const info = [
    { title: 'posts' },
    { title: 'followers' },
    { title: 'following' },
  ];
  return (
    <section className={styles.sectionContainer}>
      <Avatar />
      <div className={styles.responsiveContainer}>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>유저이름</h1>
        </div>
        <ul className={styles.listContainer}>
          {info.map(({ title }, index) => (
            <li key={index}>
              <span></span>
              {title}
            </li>
          ))}
        </ul>
        <p>??</p>
      </div>
    </section>
  );
}
