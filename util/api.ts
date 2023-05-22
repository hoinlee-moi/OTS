import axios from "axios";
import { cookies } from "next/dist/client/components/headers";


type signData = {
  emailId: string;
  password: string;
  nickname: string;
};
type loginData = {
  emailId: string;
  password: string;
};

// 카카오 로그인 부분은 컴포넌트 내에 작성하였습니다.

export const emailDuplicate = async (userEmail: string) => {
  try {
    const response = await axios.get(
      `/api/auth/emailIds/${userEmail}/exists`
    );
    return response.status;
  } catch (err) {
    throw err;
  }
};

export const nickNameDuplicate = async (userNick: string) => {
  try {
    const response = await axios.get(
      `/api/auth/nicknames/${userNick}/exists`
    );
    return response.status;
  } catch (err) {
    throw err;
  }
};

export const signUp = async (userData: signData) => {
  try {
    const response = await axios.post(
      "/auth/signup",
      userData
    );
    return response.status;
  } catch (err) {
    throw err;
  }
};

export const login = async (userData: loginData) => {
  try {
    const response = await axios.post(
      "/auth/login",
      userData
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getBoardPostList = async (page: number) => {
  try {
    const response = await axios.get(
      `/api/posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getDetailPost = async (postId: number) => {
  try {
    const response = await axios.get(
      `api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")}`,
        },
      }
    );
    return response
  } catch (err) {
    throw err;
  }
};
