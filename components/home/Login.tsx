"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./homeModal.module.css";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login=() =>{
  const router = useRouter();
  const [userData, setUserData] = useInput({
    emailId: "",
    password: "",
  });
  const [loginFailMs, setLoginFailMs] = useState("");
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setLoginFailMs("");
  }, [userData]);

  const keyDownHandle =useCallback( (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loginHandle();
  },[userData]);

  const loginHandle = useCallback(async () => {
    if (userData.emailId === "" || userData.password === "") {
      setLoginFailMs("아직 입력되지 않은부분이 있습니다");
      return;
    }
    if (loginState) return;
    setLoginState(true);
    try {
      const response = await signIn("credentials", {
        ...userData,
        redirect: false,
        callbackUrl: "/main",
      });
      if (response?.ok === false) {
        setLoginFailMs("E-Mail 또는 비밀번호가 올바르지 않습니다");
        setLoginState(false);
      }
      if (response?.status === 200 && response?.ok === true)
        router.replace(response.url as string);
    } catch (err) {
      console.log(err);
      setLoginFailMs("E-Mail 또는 비밀번호가 올바르지 않습니다");
      setLoginState(false);
    }
  }, [userData]);

  return (
    <div>
      <div className={styles.logoImg}>
        <img src="/assets/logoPic.png" />
      </div>
      <div className={styles.loginContent}>
        <h1>오태식에 오신 것을 환영합니다</h1>
        <p>꼭 그렇게 다 먹어야만 속이 후련했냐</p>
      </div>
      <div className={styles.loginInput}>
        <div>
          <input
            type="text"
            placeholder="E-Mail"
            name="emailId"
            autoComplete="off"
            onChange={setUserData}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            maxLength={14}
            onChange={setUserData}
            onKeyDown={keyDownHandle}
          />
        </div>
        {userData !== "" && <p>{loginFailMs}</p>}
        {loginState ? (
          <div className={styles.loginLoading}>
            <svg>
              <circle cx="50%" cy="50%" r="25"></circle>
            </svg>
          </div>
        ) : (
          <button onClick={loginHandle}>로그인</button>
        )}
      </div>
    </div>
  );
}
export default React.memo(Login)