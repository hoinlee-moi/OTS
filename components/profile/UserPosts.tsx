import styles from './UserPosts.module.css';

const tabs = [{ type: 'posts' }, { type: 'liked' }];

export default function UserPosts() {
  return (
    <section>
      <ul className={styles.menuList}>
        {tabs.map(({ type }) => (
          <li className={styles.manuName} key={type}>
            <span className={styles.listName}>{type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
