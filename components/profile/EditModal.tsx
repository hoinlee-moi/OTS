"use clinet";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./EditModal.module.css";
import Button from "../Button";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
  onClose: () => void;
};

export default function EditModal({ onClose }: Props) {
  const [nickname, setNickname] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [file, setFile] = useState<File>();
  const [gender, setGender] = useState("none");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async () => {


    try {
      const formData = new FormData();
      formData.set("nickname",nickname)
      formData.set("gender",gender)
    if (file) {
      formData.set("profileUrl", file);
    }
      const response = axios.post("/api/auth/edit", formData);
      console.log((await response).data)
      // if (!response.ok) {
      //   throw new Error(`${response.status} ${response.statusText}`);
      // }
      router.push("/main/profile");
    } catch (err) {
      throw err;
    }
  };

  return (
    <section
      className={styles.editModalContainer}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button className={styles.closeButton} onClick={() => onClose()}>
        닫기
      </button>
      <div className={styles.editProfileContainer}>
        <form className={styles.formContainer}>
          <div className={styles.fair}>
            <p>닉네임</p>
            <input
              className={styles.nicknameInput}
              type="text"
              name="nickname"
              ref={inputRef}
              placeholder="닉네임을 입력해주세요."
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
          </div>
          <div className={styles.fair}>
            <p>프로필 이미지</p>
            <input
              className="hidden"
              name="file"
              id="input-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className={styles.fair}>
            <p>성별</p>
            <label className={styles.genderForm}>
              <input
                type="radio"
                name="usergender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              남성
              <input
                type="radio"
                name="usergender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              여성
              <input
                type="radio"
                name="usergender"
                value="none"
                onChange={(e) => setGender(e.target.value)}
                defaultChecked
              />
              그 외
            </label>
          </div>
        </form>
        <Button text="제출" onClick={handleSubmit} />
      </div>
    </section>
  );
}
