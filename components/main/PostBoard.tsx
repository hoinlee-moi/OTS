"use client";

import { app } from "@/util/firebase";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import { useState } from "react";

export default function PostBoard() {
  const [imgUrl, setImgUrl] = useState("");
  const storage = getStorage(app);
  
  getDownloadURL(ref(storage, "main_food_0.jpeg"))
    .then((url) => {
      setImgUrl(url);
    })
    .catch((error) => {
      // Handle any errors
    });

  return (
    <div>
      
    </div>
  );
}
