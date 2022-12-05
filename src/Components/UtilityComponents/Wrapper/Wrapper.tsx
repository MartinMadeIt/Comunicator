import { ChildrenType } from '../../../types'
import styles from '../Wrapper/Wrapper.module.scss'

function Wrapper({children}: ChildrenType) {
  return (
    <div className={styles.wrapper}>
        {children}
    </div>
  )
}

export default Wrapper