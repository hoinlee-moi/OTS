import styles from "./page.module.css";
import ProfileWrap from "@/components/profile/ProfileWrap";
import BoardWrap from "@/components/profile/BoardWrap";

export default function Profile({params}:{params:{email:string}}) {

  return (
    <section className={styles.container}>
      <ProfileWrap param={params}/>
      <BoardWrap param={params}/>
    </section>
  );
}
