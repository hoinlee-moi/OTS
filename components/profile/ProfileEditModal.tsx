import React, { useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./editModal.module.css";
import ProfileEditImage from "./ProfileEditImage";
import ProfileEditInfo from "./ProfileEditInfo";
import ProfileEditPassword from "./ProfileEditPassword";
import { fileDelete, fileUpload } from "@/util/firebase";
import { deleteUser, profileEdit } from "@/util/api";
import { profileUserDataContext } from "./ProfileWrap";
import WorkStateModal from "../etc/WorkStateModal";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type updateData = {
  email: string;
  nickname: string;
  gender: string;
  profileImgUrl: { name: string; url: string }[];
};
export type editData = {
  nickname: string;
  profileImgFile: File[];
  gender: string;
};

const ProfileEditModal = ({ closeModal }: props) => {
  const router = useRouter();
  const { userData } = useContext(profileUserDataContext);
  const { data: session, update: sessionUpdate } = useSession();
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [editUserData, setEditUserData] = useState<editData>({
    nickname: "",
    profileImgFile: [],
    gender: "",
  });
  const [nickCheck, setNickCheck] = useState(false);
  const [editState, setEditState] = useState(false);
  const [success, setSuccess] = useState("loading");
  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    setSuccess("loading");
  }, [editState]);
  useEffect(() => {
    if (success === "close") {
      const user = session?.user as any;
      router.push(`/main/profile/${user.nickname}`);
    }
  }, [success]);
  useEffect(() => {
    if (
      editUserData.nickname !== userData.nickname ||
      editUserData.gender !== userData.gender ||
      editUserData.profileImgFile.length > 0
    )
      setBtnState(true)
      else setBtnState(false);
  }, [editUserData]);

  const mouseDownHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      closeModal(false);
    }
  };

  const profileEditHandle = async () => {
    if (editUserData.nickname !== userData.nickname) {
      if (!nickCheck) return;
    }
    setEditState(true);
    const data: updateData = {
      email: userData.emailId,
      nickname: editUserData.nickname,
      gender: editUserData.gender,
      profileImgUrl: [],
    };
    if (editUserData.profileImgFile.length > 0) {
      const fileUrl = await fileUpload(editUserData.profileImgFile, "user");
      if (fileUrl.length < 1) {
        alert("서버와의 연결이 올바르지 않습니다. 잠시 후 다시 시도해주세요");
        return;
      }
      data.profileImgUrl = fileUrl;
    }
  
    try {
      const response = await profileEdit(data);
      if (response.status === 200) {
        if (data.profileImgUrl.length > 0) {
          if (userData.profileImgName !== data.profileImgUrl[0].name&&userData.profileUrl!=="/assets/basic_profile.jpg") {
            const file = [
              {
                url: userData.profileUrl,
                name: userData.profileImgName,
              },
            ];
            await fileDelete(file, "user");
          }
        }
        sessionUpdate({
          info: {
            ...response.data.token,
          },
        });
        setSuccess("success");
      }
    } catch (error) {
      console.log(error);
      if (editUserData.profileImgFile.length > 0) {
        await fileDelete(data.profileImgUrl, "user");
      }
      setSuccess("fail");
    }
  };

  const deleteUserHandle = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        const response = await deleteUser(userData.emailId);
        if (response.status === 200) {
          signOut();
        }
      } catch (error) {
        alert("서버와 연결이 끊어졌습니다.");
      }
    }
  };

  return (
    <>
      {editState && (
        <WorkStateModal
          closeModal={setEditState}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      <div className={styles.editModalBack} onMouseDown={mouseDownHandle}>
        <FontAwesomeIcon icon={faX} className={styles.closeBtn} />
        <section
          className={styles.editModal}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.modalTitle}>
            <button className={styles.userDelete} onClick={deleteUserHandle}>
              회원탈퇴
            </button>
            <h3>프로필 변경하기</h3>
          </div>
          <div className={styles.modalContent}>
            <ProfileEditImage setEditUserData={setEditUserData} />
            <ProfileEditInfo
              setEditUserData={setEditUserData}
              setNickCheck={setNickCheck}
            />
            <button
              className={styles.pwEditBtn}
              onClick={() => setPasswordEdit(true)}
            >
              비밀번호 변경하기
            </button>
            {passwordEdit && (
              <ProfileEditPassword closeModal={setPasswordEdit} />
            )}
          </div>
          <div className={styles.profileEditBtn}>
            <button onClick={profileEditHandle} disabled={!btnState}>
              변경하기
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfileEditModal;
