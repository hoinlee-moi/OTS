import styles from "./editModal.module.css";

const ProfileEditPassword = () => {
  return (
    <div className={styles.pwEditModalBack}>
      <section className={styles.pwEdit}>
        <div className={styles.title}>
          <h3>비밀번호 변경하기</h3>
        </div>
        <div className={styles.pwEditEx}>
          <p>
            비밀번호는 8~14자이내 영어 대소문자,숫자,특수기호를 최소 1개이상
            포함하여야 합니다
          </p>
        </div>
        <div className={styles.pwEditWrap}>
          <div>
            <input type="text" placeholder="현재 비밀번호"/>
          </div>
          <div>
            <input type="text" placeholder="새 비밀번호"/>
          </div>
          <div>
            <input type="text" placeholder="새 비밀번호 재입력"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileEditPassword;
