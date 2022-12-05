import { Link } from 'react-router-dom'
import Container from '../Container/Container'
import styles from "./NoAccess.module.scss"

function NoAccess() {
  return (
    <Container>
        <div className={styles.bg}>
            <p className={styles.four0four}>404</p>
            <p className={styles.desc}>Hello Visitor ! You're trying to reach something unreachable ! Site not exist or you just have to login !</p>
            <Link to='/login'><button className={styles.go}>Go to login</button></Link>
        </div>
    </Container>
  )
}

export default NoAccess