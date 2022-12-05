import Container from "../Container/Container"
import styles from "./MessageBox.module.scss"

export interface MessageBoxType {
    username : string,
    message : string,
    createdAt : string,
    isAuthor : boolean
}

function MessageBox({username, message, createdAt, isAuthor}:MessageBoxType) {
  return (

    <div className={!isAuthor ? styles.box : styles.boxAuthor}>
        <p className={styles.username}>{username}</p>
        <p className={styles.message}>{message}</p>
        <p className={styles.created}>{createdAt}</p>
    </div>

  )
}

export default MessageBox