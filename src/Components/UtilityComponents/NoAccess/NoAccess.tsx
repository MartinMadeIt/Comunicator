import { Link } from 'react-router-dom'
import Container from '../Container/Container'
import styles from "./NoAccess.module.scss"

function NoAccess() {
  return (
    <Container>
        <div className={styles.bg}>
            <p className={styles.four0four}>Hello user !</p>
            <p className={styles.desc}>It seems that you're trying to reach messages that are reserved only to registered users ! </p>

            <div className={styles.actions}>
              <Link to='/login'><button className={styles.go}>Login</button></Link>
              <Link to='/signup'><button className={styles.go}>Register</button></Link>
            </div>
        </div>
    </Container>
  )
}

export default NoAccess