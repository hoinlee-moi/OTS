import Image from "next/image";
import styles from "./profile.module.css";

type props = {
  profile: string;
};

export default function UserProfileImg({ profile }: props) {
  return (
    <div className={styles.profileImg}>
      <Image
        src={profile}
        alt=""
        width={80}
        height={80}
        priority
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fPl8PQAH7AL2dy8SSgAAAABJRU5ErkJggg=="
      />
    </div>
  );
}
