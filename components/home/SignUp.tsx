"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./homeModal.module.css";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { emailDuplicate, login, nickNameDuplicate, signUp } from "@/util/api";
import InputWithIcon from "./InputWithIcon";
import { REGULAR } from "@/util/reg";

type props = { modalClose?: React.Dispatch<React.SetStateAction<boolean>> };

export const reg = REGULAR;

const SignUp = ({ modalClose }: props) => {
  const router = useRouter();
  const [userData, setUserData] = useInput({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });
  const [emailDupStatus, setEmailDupStatus] = useState(false);
  const [nickDupStatus, setNickDupStatus] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [psCheck, setPsCheck] = useState(false);
  const [rePsCheck, setRePsCheck] = useState(false);
  const [nikCheck, setNickCheck] = useState(false);
  const [alertMs, setAlertMs] = useState("");
  const [signUpState, setSignUpState] = useState(false);

  useEffect(() => {
    setAlertMs("");
  }, [userData]);
  useEffect(() => {
    setEmailCheck(false);
    setEmailDupStatus(false);
  }, [userData.email]);
  useEffect(() => {
    setPsCheck(false);
  }, [userData.password]);
  useEffect(() => {
    setRePsCheck(false);
  }, [userData.passwordCheck]);
  useEffect(() => {
    setNickCheck(false);
    setNickDupStatus(false);
  }, [userData.nickname]);

  const checkSignUpData = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      switch (inputName) {
        case "password":
          if (!reg.regPs.test(inputValue)) {
            setPsCheck(true);
            setAlertMs(
              "비밀번호는 8~14자이내 영어 대소문자,숫자,특수기호를 최소 1개이상 포함하여야 합니다."
            );
            return;
          }
          break;
        case "passwordCheck":
          if (userData.password !== inputValue) {
            setRePsCheck(true);
            setAlertMs("비밀번호 재입력이 올바르지 않습니다");
            return;
          }
          break;
        default:
          return;
      }
    },
    [userData]
  );

  const emailCheckHandle = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (!reg.regEmail.test(inputValue)) {
        setEmailCheck(true);
        setAlertMs("E-Mail이 올바르지 않습니다");
        return;
      }
      if (!emailDupStatus) {
        try {
          const response = await emailDuplicate(inputValue);
          if (response.status === 200) {
            setEmailDupStatus(true);
          }
        } catch (err: any) {
          console.log(err);
          if (err.response.status === 405) {
            setEmailCheck(true);
            setAlertMs("E-Mail이 올바르지 않습니다");
            return;
          }
          if (err.response.status === 400) {
            setEmailCheck(true);
            setAlertMs("사용중인 E-Mail입니다");
          }
          // 에러 처리
        }
      }
    },
    [userData.email, emailDupStatus]
  );

  const nickCheckHandle = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>) => {
      if (!reg.regNickname.test(e.target.value)) {
        setNickCheck(true);
        setAlertMs(
          "닉네임은 2~12자이내 한글,숫자,영문,_,-를 포함하여 만들수 있습니다"
        );
        return;
      }
      if (!nickDupStatus) {
        try {
          const response = await nickNameDuplicate(e.target.value);
          if (response.status === 200) {
            setNickDupStatus(true);
          }
        } catch (err) {
          console.log(err);
          setNickCheck(true);
          setAlertMs("사용중인 닉네임입니다");
        }
      }
    },
    [userData.nickname, nickDupStatus]
  );
  const signUpHandle = useCallback(async () => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.passwordCheck === "" ||
      userData.nickname === ""
    ) {
      setAlertMs("아직 입력되지 않은 부분이 있습니다");
      return;
    }

    if (signUpState) return;
    if (
      emailDupStatus &&
      nickDupStatus &&
      !emailCheck &&
      !psCheck &&
      !rePsCheck
    ) {
      setSignUpState(true);
      const signData = {
        emailId: userData.email,
        password: userData.password,
        nickname: userData.nickname,
      };

      try {
        const response = await signUp(signData);
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다");
          modalClose && modalClose(false);
        }
      } catch (err) {
        console.log(err);
        setAlertMs("회원가입에 실패하였습니다. 잠시후 다시 실행해주세요");
        setSignUpState(false);
      }
    }
  }, [userData, nickDupStatus, emailDupStatus]);

  return (
    <div>
      <div className={styles.logoImg}>
        <img src="/assets/logoPic.png" />
      </div>
      <div className={styles.signUpContent}>
        <h1>오태식에 오신 것을 환영합니다</h1>
        <p>꼭 그렇게 다 먹어야만 속이 후련했냐</p>
      </div>
      <div className={styles.signUpInput}>
        <InputWithIcon
          type="text"
          placeholder="E-Mail"
          name="email"
          onChange={setUserData}
          onBlur={emailCheckHandle}
          checkState={emailCheck}
        />
        <InputWithIcon
          type="password"
          placeholder="Password"
          name="password"
          maxLength={14}
          onChange={setUserData}
          onBlur={checkSignUpData}
          checkState={psCheck}
        />

        <InputWithIcon
          type="password"
          placeholder="Re-enter password"
          name="passwordCheck"
          maxLength={14}
          onChange={setUserData}
          onBlur={checkSignUpData}
          checkState={rePsCheck}
        />
        <InputWithIcon
          type="text"
          placeholder="Nickname"
          name="nickname"
          maxLength={12}
          onChange={setUserData}
          onBlur={nickCheckHandle}
          checkState={nikCheck}
        />
        {alertMs !== "" && <p>{alertMs}</p>}
        {signUpState ? (
          <div className={styles.loginLoading}>
            <svg>
              <circle cx="50%" cy="50%" r="25"></circle>
            </svg>
          </div>
        ) : (
          <button onClick={signUpHandle}>회원가입</button>
        )}
      </div>
    </div>
  );
};
export default React.memo(SignUp);
