
import { useEffect } from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

type AvatarSize = "small" | "medium" | "large" | "xlarge";
type Props = {
  image?: string | null;
  size?: AvatarSize;
};

export default function Avatar({ image }: any) {
  return (
    <div className={styles.baseStyle}>
      <img
        alt="user profile"
        src={image === "" ? "/assets/basic_profile.jpg" : image}
        referrerPolicy="no-referrer"
        width={50}
        height={50}
      />
    </div>
  );
}
