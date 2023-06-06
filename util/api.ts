
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

type deletePost = {
  userId:string
  postId:string
}
type updatePost ={
  postId : string
  userId : string
  content: string
}

type postComment = {
  _id:string
  comment:string
}
type deleteComment = {
  _id:string
  userId:string
}

type updateComment = {
  _id:string
  userId: string
  comment: string
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

export const getPostDetail = async (postId: number) => {
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

export const deletePost = async(deleteData:deletePost)=>{
  try {
    const response = await axios.post('/api/post/edit',deleteData)
    return response
  } catch (error) {
    throw error
  }
}

export const updatePost = async(updateData:updatePost)=>{
  try {
    const response = await axios.put('/api/post/edit',updateData)
    return response
  } catch (error) {
    return error
  }
}

export const postCommentWrite = async(comment:postComment) => {
  try {
    const response = await axios.post("/api/post/comment",comment)
    return response
  } catch (error) {
    throw error
  }
}

export const getCommentList = async(postId:string) => {
  try {
    const response = await axios.get(`/api/post/comment?postId=${postId}`)
    return response
  } catch (error) {
    throw error
    
  }
}

export const deleteComment = async(data:deleteComment) => {
  try {
    const response = await axios.post("/api/post/comment/edit",data)
    return response
  } catch (error) {
    throw error
  }
}

export const putComment = async(data:updateComment) => {
  try {
    const response = await axios.put('/api/post/comment/edit',data)
    return response
  } catch (error) {
    throw error
  }
}

export const getUserProfile = async(email:string)=>{
  try {
    const response = await axios.get(`/api/user/${email}`)
    return response
  } catch (error) {
    throw error
  }
}
