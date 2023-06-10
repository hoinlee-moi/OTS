'use client'
import React,{useEffect} from 'react'
import {  useSearchParams } from "next/navigation";
import axios from 'axios';
import { cookies } from 'next/dist/client/components/headers';


export default function KakaoLogin() {
  const PARAMS = useSearchParams()
  const CODE = PARAMS.get("code");
  // const router = useRouter();

  useEffect(() => {
    kakaologinHandler();
  }, []);

  const kakaologinHandler = async () => {
    await axios
      .get(`/api/auth/kakao?code=${CODE}`)
      .then((res) => {
        console.log(res)
        // cookies().set("accessToken", res.data.accessToken);
        // cookies().set("refreshToken", res.data.refreshToken);
        // router.push("/main")
      })
      .catch((err) => {
        console.log(err);
        alert("카카오 로그인에 실패하였습니다");
        // router.push("/");
      });
      
  };
  return <div></div>;
}
