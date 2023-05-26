import styles from "./MakeModal.module.css"
type props = {
  setPostData : React.Dispatch<React.SetStateAction<any>>
}

export default function ModalContent({setPostData}:props) {
  return <div className={styles.contentContainer}></div>;
}
