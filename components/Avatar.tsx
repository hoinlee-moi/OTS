import Link from "next/link";
import styles from "./avatar.module.css";
import Image from "next/image";
import React from "react";

type AvatarSize = "small" | "medium" | "large" | "xlarge";
type props = {
  image: string;
  nickname: string;
};

 const Avatar=({ image, nickname }: props) =>{

  return (
    <div className={styles.baseStyle}>
      <Link href={`/main/profile/${nickname}`}>
        {image && (
          <Image
            alt="user profile"
            src={image}
            referrerPolicy="no-referrer"
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fPl8PQAH7AL2dy8SSgAAAABJRU5ErkJggg=="
          />
        )}
      </Link>
    </div>
  );
}
export default React.memo(Avatar)
