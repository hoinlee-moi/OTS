
import {foodList } from "@/components/main/MakeModal";
import axios from "axios";


type signData = {
  emailId: string;
  password: string;
  nickname: string;
};
type loginData = {
  emailId: string;
  password: string;
};
type postData = {
  content: string;
  file: {url:string,name:string}[];
  imgRatio: string;
  foodList: foodList;
  nuKcal: number;
  nuCarb: number;
  nuPro: number;
  nuFat: number;
}

// 카카오 로그인 부분은 컴포넌트 내에 작성하였습니다.

export const emailDuplicate = async (userEmail: string) => {
  try {
    const response = await axios.get(`/api/auth/duplicate?email=${userEmail}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const nickNameDuplicate = async (userNick: string) => {
  try {
    const response = await axios.get(
      `/api/auth/duplicate?nickname=${userNick}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData: signData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData: loginData) => {
  try {
    const response = await axios.post("/auth/login", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBoardPostList = async (page: number) => {
  try {
    const response = await axios.get(`/api/post/list?page=${page}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetailPost = async (postId: number) => {
  try {
    const response = await axios.get(`api/post/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFoodSearch = async (foodName: string) => {
  try {
    const response = await axios.get(
      `/api/post/foodSearch?foodName=${foodName}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createPostWrite = async(postData:postData)=>{
try {
  const response = await axios.post("/api/post/create",postData)
  return response
} catch (error) {
  throw error
}
}