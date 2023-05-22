import styles from './Avatar.module.css';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type Props = {
  image?: string | null;
  size?: AvatarSize;
};

export default function Avatar() {
  return <div></div>;
}
