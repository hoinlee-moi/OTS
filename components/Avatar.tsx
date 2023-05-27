import styles from './Avatar.module.css';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type Props = {
  image?: string | null;
  size?: AvatarSize;
};

export default function Avatar({ image }) {
  return (
    <div className={styles.baseStyle}>
      <img
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
