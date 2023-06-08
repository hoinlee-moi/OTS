import { ChangeEvent, useEffect, useState } from "react";
import styles from "./editModal.module.css";
import useInput from "@/hooks/useInput";

type props = {
  password: { curPw: string; newPw: string; newPwCheck: string };
  setPassword: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EditPasswordInput = ({ password, setPassword }: props) => {
  const [curPwLabel, setCurPwLabel] = useState(false);
  const [newPwLabel, setNewPwLabel] = useState(false);
  const [newPwCheckLabel, setNewPwCheckLabel] = useState(false);

  useEffect(() => {
    if (password.curPw !== "") setCurPwLabel(true);
    else setCurPwLabel(false);

    if (password.newPw !== "") setNewPwLabel(true);
    else setNewPwLabel(false);

    if (password.newPwCheck !== "") setNewPwCheckLabel(true);
    else setNewPwCheckLabel(false);
  }, [password]);
  return (
    <div className={styles.pwEditWrap}>
      <div>
        <input
          type="password"
          id="curPw"
          name="curPw"
          onChange={setPassword}
          maxLength={14}
        />
        <label
          htmlFor="curPw"
          className={curPwLabel ? styles.inputLabel : styles.labelPlaceholder}
        >
          현재 비밀번호
        </label>
      </div>
      <div>
        <input
          type="password"
          id="newPw"
          name="newPw"
          onChange={setPassword}
          maxLength={14}
        />
        <label
          htmlFor="newPw"
          className={newPwLabel ? styles.inputLabel : styles.labelPlaceholder}
        >
          새 비밀번호
        </label>
      </div>
      <div>
        <input
          type="password"
          id="newPwCheck"
          name="newPwCheck"
          onChange={setPassword}
          maxLength={14}
        />
        <label
          htmlFor="newPwCheck"
          className={
            newPwCheckLabel ? styles.inputLabel : styles.labelPlaceholder
          }
        >
          새 비밀번호 재입력
        </label>
      </div>
    </div>
  );
};

export default EditPasswordInput;
