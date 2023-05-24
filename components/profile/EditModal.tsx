'use clinet';
import { useState, useRef } from 'react';
import styles from './EditModal.module.css';
import Button from '../Button';

type Props = {
  onClose: () => void;
};

export default function EditModal({ onClose }: Props) {
  const [nickname, setNickname] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section
      className={styles.editModalContainer}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button className={styles.closeButton} onClick={() => onClose()}>
        닫기
      </button>
      <div className={styles.editProfileContainer}>
        <form className={styles.formContainer}>
          <div className={styles.fair}>
            <p>닉네임</p>
            <input
              className={styles.nicknameInput}
              type="text"
              ref={inputRef}
              placeholder="닉네임을 입력해주세요."
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
          </div>
          <div className={styles.fair}>
            <p>소개</p>
            <textarea
              className={styles.introTeaxtarea}
              name="text"
              id="input-text"
              required
              rows={10}
              placeholder={'Write a caption...'}
              ref={textRef}
            />
          </div>
        </form>
        <Button text="제출" onClick={() => {}}></Button>
      </div>
    </section>
  );
}
