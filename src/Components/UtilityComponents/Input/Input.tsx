import { InputInterface } from "../../../types"
import styles from "./Input.module.scss"

const returnError = (field:string) => <p>{field} is a required field</p>

function Input<T>({formik, name, type, placeholder, value}:InputInterface<T>) {
  return (
        <input 
            type= {type}
            name = {String(name)}
            placeholder = {placeholder}
            onChange = {formik.handleChange}
            className={styles.input}
            value={value}
        />

  )
}

export default Input;