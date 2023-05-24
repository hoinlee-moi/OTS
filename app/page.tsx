import Image from "next/image";
import styles from "./page.module.css";
import SignUpBox from "../components/home/SignUpBox";
import Sections from "@/components/home/Sections";



export default async function Home() {

  return (
    <main className={styles.container}>
      <header>
        <article className={styles.logoBox}>
          <img src="/assets/logo.png/" />
        </article>
        <SignUpBox />
      </header>
      <Sections />
    </main>
  );
}
