import Container from '../UtilityComponents/Container/Container'
import styles from './SignInPage.module.scss'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/scss/notification.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/Authorisation/AuthContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InferType } from 'yup'
import { createUser } from '../../Controllers/createUser'
import { getUSER } from '../../Controllers/ManageLoginState'
import { useEffect } from 'react'
import Input from '../UtilityComponents/Input/Input'
import { Store } from 'react-notifications-component'

const signupSchema = yup.object({
    user: yup.string().required(),
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})



export type SignupFormValues = InferType<typeof signupSchema>

function SignInPage() {

  const navigate = useNavigate()
  const {setIsLoggedIn} = useAuthContext()

  const checkIfIsOK = async () => getUSER().then(data =>
    {
      if(data?.id){
          setIsLoggedIn(true)
          navigate('/')
      }
  }
  )

  useEffect(() => {
    checkIfIsOK()
  }, [])

  const signupFormik = useFormik<SignupFormValues>({
    initialValues: {
      user: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: ""
    },
    onSubmit:  (values, {resetForm}) => {
        createUser({
          user: values.user,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          password2: values.password2
        });

        Store.addNotification({
          title: "Great !",
          message: "Now check your email and click confirmation link. After that you will be able to log in",
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
          duration: 4000,
          onScreen: true
          }
        })
        resetForm({values:signupFormik.initialValues})
    },
    validationSchema: signupSchema
  })


  return (
    <Container>
      <ReactNotifications />
        <div className={styles.card}>
            <div className={styles.desc}>
                <p>SIGN UP</p> 
            </div>
            <div className={styles.inputs}>
                <form className={styles.form} onSubmit={signupFormik.handleSubmit}>
                    <Input type={"text"} name='user' formik={signupFormik} placeholder={'Username'} value={signupFormik.values.user} />
                    <Input type={"text"} name='email' formik={signupFormik} placeholder={'E-mail'} value={signupFormik.values.email} />
                    <Input type={"text"} name='firstName' formik={signupFormik} placeholder={'First name'} value={signupFormik.values.firstName} />
                    <Input type={"text"} name='lastName' formik={signupFormik} placeholder={'Last name'} value={signupFormik.values.lastName} />
                    <Input type={"password"} name='password'formik={signupFormik} placeholder={'Password'} value={signupFormik.values.password} />
                    <Input type={"password"} name='password2'formik={signupFormik} placeholder={'Repeat password'} value={signupFormik.values.password2} />
                    <button type='submit' className={styles.submit}>Submit</button>
                </form>

            </div>
            <div className={styles.change}>
                <p className={styles.joinUS}>Already have an account ?</p>
                <Link to='/login'>Log in!</Link>
            </div>
        </div>

    </Container>
  )
}

export default SignInPage