import { ErrorMessage, FormikProps } from "formik"
import { NOTIFICATION_TYPE, Store } from "react-notifications-component"
import Container from "../Container/Container"
import styles from "./Input.module.scss"

export interface InputInterface<T> {
    formik:FormikProps<T>,
    name: keyof T,
    type: 'text' | 'password',
    placeholder: string
}

const notify = ({title, type, message}:{title:string, type:NOTIFICATION_TYPE, message:string}) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
      duration: 3000,
      onScreen: true
      }
  });
  }

const returnError = (field:string) => <p>{field} is a required field</p>

function Input<T>({formik, name, type, placeholder}:InputInterface<T>) {
  return (
        <input 
            type= {type}
            name = {String(name)}
            placeholder = {placeholder}
            onChange = {formik.handleChange}
            className={styles.input}
        />

  )
}

export default Input;