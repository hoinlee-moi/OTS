import useInput from "@/hooks/useInput";
import styles from "./editModal.module.css";
import EditPasswordInput from "./EditPasswordInput";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { REGULAR } from "@/util/reg";
import { profileUserDataContext } from "./ProfileWrap";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditPassword = ({ closeModal }: props) => {
  const {userData} = useContext(profileUserDataContext)
  const [password, setPassword] = useInput({
    curPw: "",
    newPw: "",
    newPwCheck: "",
  });
  const [editState, setEditState] = useState(true);

  useEffect(() => {
    const reg = REGULAR;
    if (
      reg.regPs.test(password.curPw) &&
      reg.regPs.test(password.newPw) &&
      reg.regPs.test(password.newPwCheck)
    )
      setEditState(true);
    else setEditState(false);
  }, [password]);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      closeModal(false);
    }
  };

  const editPasswordHandle = async() => {
    
  }

  return (
    <div className={styles.pwEditModalBack} onMouseDown={mouseDownHandle}>
      <section
        className={styles.pwEdit}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon
          icon={faX}
          className={styles.closeBtn}
          onClick={() => closeModal(false)}
        />
        <div className={styles.title}>
          <h3>비밀번호 변경하기</h3>
        </div>
        <div className={styles.pwEditEx}>
          <p>
            비밀번호는 8~14자이내 영어 대소문자,숫자,특수기호를 최소 1개이상
            포함하여야 합니다
          </p>
        </div>
        <EditPasswordInput password={password} setPassword={setPassword} />
        <button
          className={editState ? styles.editBtn : styles.editBtnX}
          disabled={!editState}
          onClick={editPasswordHandle}
        >
          비밀번호 변경하기
        </button>
      </section>
    </div>
  );
};

export default ProfileEditPassword;
