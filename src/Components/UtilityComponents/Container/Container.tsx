import { ChildrenType } from '../../../types'
import styles from './Container.module.scss'

function Container({children}: ChildrenType) {
    return (
      <div className={styles.container}>
          {children}
      </div>
    )
  }

export default Container