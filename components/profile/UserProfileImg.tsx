import Image from "next/image";
import styles from "./profile.module.css";

type props = {
  profile: string;
};

export default function UserProfileImg({ profile }: props) {
  return (
    <div className={styles.profileImg}>
      <Image src={profile} alt="" width={80} height={80} priority />
    </div>
  );
}
