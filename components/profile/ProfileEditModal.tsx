import React from "react";
import styles from "./editModal.module.css";
import ProfileEditImage from "./ProfileEditImage";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditModal = ({ closeModal }: props) => {
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
          <div>성별 편집</div>
          <div>비밀번호 변경/모달</div>
          <div>닉네임</div>
        </div>
      </section>
    </div>
  );
};

export default ProfileEditModal;
