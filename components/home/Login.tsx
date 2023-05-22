'use client'

import React, { useState, useEffect, useCallback } from "react";
import styles from "./homeModal.module.css";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { cookies } from "next/dist/client/components/headers";
import { login } from "@/util/api";
import KakaoSignUp from "./KakaoSignUp";


export default function Login() {
    const router = useRouter()
  const [userData, setUserData] = useInput({
    emailId: "",
    password: "",
  });
  const [loginFailMs, setLoginFailMs] = useState("");

  useEffect(() => {
    setLoginFailMs("");
  }, [userData]);

  const loginHandle = useCallback(async () => {
    if (userData.emailId === "" || userData.password === "") {
      setLoginFailMs("아직 입력되지 않은부분이 있습니다");
      return;
    }
    try {
      const response = await login(userData);
      if (response.status === 201) {
        cookies().set('accessToken',response.data.accessToken) ;
        cookies().set("refreshToken", response.data.refreshToken);
        sessionStorage.setItem("emailId", response.data.emailId);
        router.push("/main")
      }
    } catch (err) {
      setLoginFailMs("E-Mail 또는 비밀번호가 올바르지 않습니다");
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
          />
        </div>
        {userData !== "" && <p>{loginFailMs}</p>}
        <button onClick={loginHandle}>로그인</button>
      </div>
      <KakaoSignUp />
    </div>
  );
}
