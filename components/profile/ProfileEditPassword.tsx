import useInput from "@/hooks/useInput";
import styles from "./editModal.module.css";
import EditPasswordInput from "./EditPasswordInput";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { REGULAR } from "@/util/reg";
import { profileUserDataContext } from "./ProfileWrap";
import { editPassword } from "@/util/api";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditPassword = ({ closeModal }: props) => {
  const { userData } = useContext(profileUserDataContext);
  const [password, setPassword] = useInput({
    curPw: "",
    newPw: "",
    newPwCheck: "",
  });
  const [editState, setEditState] = useState(true);
  const [failMs, setFailMs] = useState("");
  useEffect(() => {
    const reg = REGULAR;
    if (
      reg.regPs.test(password.curPw) &&
      reg.regPs.test(password.newPw) &&
      reg.regPs.test(password.newPwCheck) &&
      password.newPw === password.newPwCheck
    )
      setEditState(true);
    else setEditState(false);
  }, [password]);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      closeModal(false);
    }
  };

  const editPasswordHandle = async () => {
    if (!editState) return;
    try {
      const data = {
        ...password,
        userEmail: userData.emailId,
      };
      const response = await editPassword(data);
      if (response.status === 200) {
        alert("비밀번호 변경이 완료되었습니다");
        closeModal(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message === "same password") {
        setFailMs("동일한 비밀번호로 바꿀 수 없습니다");
        return;
      }
      setFailMs("현재 비밀번호가 틀렸거나 올바르지 않은 접근입니다");
    }
  };

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
        {failMs !== "" && <p className={styles.failMs}>{failMs}</p>}
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
