import styles from './button.module.css';

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};
export default function Button({
  text,
  onClick,
  red,
  disabled = false,
}: Props) {
  const buttonClasses = [
    styles.buttonContainer,
    red ? styles.red : styles.sky,
    disabled && styles.disabled,
  ].join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
