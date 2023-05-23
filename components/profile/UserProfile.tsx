'use client';

import { useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import EditModal from './EditModal';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const [openModal, setOpenModal] = useState(false);

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
          <Button text="Edit" onClick={() => setOpenModal(true)} />
          {openModal && (
            <EditModal onClose={() => setOpenModal(false)}></EditModal>
          )}
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
