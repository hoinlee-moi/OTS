import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./editModal.module.css";
import { editData, profileUserDataContext } from "./ProfileWrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const ProfileEditImage = () => {
  const { userData,setEditUserData } = useContext(profileUserDataContext);
  const [imgFile, setImgFile] = useState<string>();

  useEffect(() => {
    setImgFile(userData.profileUrl);
  }, []);

  const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
        setEditUserData((snap:editData)=>{
            return{...snap,profileImgFile:[file]}
        })
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result as string;
        setImgFile(data);
      };

      reader.readAsDataURL(file)
    }
  };

  return (
    <div className={styles.profileImg}>
      <div className={styles.imgBox}>
        {imgFile && <Image src={imgFile} width={120} height={120} alt="" />}
        <label htmlFor="imgEdit">
          <input
            type="file"
            id="imgEdit"
            accept="image/*"
            onChange={fileHandleChange}
          />
          <span>
            <FontAwesomeIcon icon={faCameraRetro} />
          </span>
        </label>
      </div>
    </div>
  );
};

export default ProfileEditImage;
