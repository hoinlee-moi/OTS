import React, { useState } from "react";
import styles from "./editModal.module.css";
import ProfileEditImage from "./ProfileEditImage";
import ProfileEditInfo from "./ProfileEditInfo";
import ProfileEditPassword from "./ProfileEditPassword";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditModal = ({ closeModal }: props) => {
  const [passwordEdit, setPasswordEdit] = useState(false);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      closeModal(false);
    }
  };

  return (
    <div className={styles.editModalBack} onMouseDown={mouseDownHandle}>
      <section
        className={styles.editModal}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div>
          <ProfileEditImage />
          <ProfileEditInfo />
          <button
            className={styles.pwEditBtn}
            onClick={() => setPasswordEdit(true)}
          >
            비밀번호 변경하기
          </button>
          {passwordEdit && <ProfileEditPassword />}
        </div>
      </section>
    </div>
  );
};

export default ProfileEditModal;
