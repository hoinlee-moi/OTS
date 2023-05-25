import React, { useState, useCallback } from "react";

export default (initalValue: any) => {
//   const [uploadedImages, setUploadedImages] = useRecoilState<any>(UploadFiles)
  const [uploadedImages, setUploadedImages] = useState(initalValue.list);
  const handleFiles = useCallback(
    (files: File[]) => {
      console.log(files,uploadedImages)
      if (files.length > initalValue.max) return;
      setUploadedImages((state:File[])=>[...state, ...files].slice(0, initalValue.max));
      
    },
    [uploadedImages]
  );

  return [uploadedImages, handleFiles];
};
