// Import the functions you need from the SDKs you need
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const fileUpload = async (files: any, location: string) => {
  const storage = await getStorage(app);
  const fileUrlArray: {name:string,url:string}[] = [];
  for (const file of files) {
    const curDate = new Date().getTime();
    const randomString = (Math.random() * 5).toString(36).substring(2, 12);
    const imgRef = ref(
      storage,
      `${location}/${curDate}_${randomString}_${file.name}`
    );
    try {
      const snapShot = await uploadBytes(imgRef, file);
      if (snapShot) {
        await getDownloadURL(imgRef).then((url) => {
          fileUrlArray.push({name:`${location}/${curDate}_${randomString}_${file.name}`,url:url});
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return fileUrlArray;
};

export const fileDelete = async(files:any,location:string) => {
  const storage = await getStorage(app)
  for(const file of files) {
    const imgRef = ref(storage,file.name)
    await deleteObject(imgRef).then(()=>{
    }).catch(err=>{
      console.log("file delete fail!"+err)
    })
  }
}