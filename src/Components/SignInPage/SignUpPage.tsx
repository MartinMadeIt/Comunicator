import Container from '../UtilityComponents/Container/Container'
import styles from './SignInPage.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Contexts/Authorisation/AuthContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { InferType } from 'yup'
import { createUser } from '../../Controllers/createUser'
import { getUSER } from '../../Controllers/ManageLoginState'
import { useEffect } from 'react'

const signupSchema = yup.object({
    user: yup.string().required("User is required field"),
    email: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})



export type SignupFormValues = InferType<typeof signupSchema>

function SignInPage() {

  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useAuthContext()

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
    onSubmit: (values) => {
      createUser({
        user: values.user,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        password2: values.password2
      });
      setIsLoggedIn(true)
      checkIfIsOK()
    },
    validationSchema: signupSchema
  })



  return (
    <Container>
        <div className={styles.card}>
            <div className={styles.desc}>
                <p>SIGN UP</p> 
            </div>
            <div className={styles.inputs}>
                <form className={styles.form} onSubmit={signupFormik.handleSubmit}>
                    <input type={"text"} name='user' onChange={signupFormik.handleChange} placeholder={'Username'}/>
                    <input type={"text"} name='email' onChange={signupFormik.handleChange} placeholder={'E-mail'}/>
                    <input type={"text"} name='firstName' onChange={signupFormik.handleChange} placeholder={'First name'}/>
                    <input type={"text"} name='lastName' onChange={signupFormik.handleChange} placeholder={'Last name'}/>
                    <input type={"password"} name='password'onChange={signupFormik.handleChange} placeholder={'Password'}/>
                    <input type={"password"} name='password2'onChange={signupFormik.handleChange} placeholder={'Repeat password'}/>
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