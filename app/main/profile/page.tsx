import styles from "./page.module.css";
import ProfileWrap from "@/components/profile/ProfileWrap";
import BoardWrap from "@/components/profile/BoardWrap";

export default function Profile() {
  return (
    <section className={styles.container}>
      <ProfileWrap />
      <BoardWrap />
    </section>
  );
}
