import Container from '../UtilityComponents/Container/Container'
import styles from './LoginPage.module.scss'
import { useEffect } from 'react'
import { useAuthContext } from '../../Contexts/Authorisation/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/scss/notification.scss'
import { Store } from 'react-notifications-component';
import { useFormik } from 'formik'
import { supabase } from '../../databaseClient'
import { getUSER } from '../../Controllers/ManageLoginState'

  
  


function LoginPage() {

    const navigate = useNavigate()
    const {setIsLoggedIn} = useAuthContext()

   const checkIfIsLogged = async () => getUSER().then(data => 
        {
            if(data?.id){
                setIsLoggedIn(true)
                navigate('/')
            } else {
                setIsLoggedIn(false)
            } 
        }
    )
    
    useEffect(() => {
        checkIfIsLogged()
    }, [])

    const signinFormik = useFormik({
        initialValues : {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if(data.session) {
                setIsLoggedIn(true)
                navigate("/")
            } else {
                Store.addNotification({
                    title: "Oops !",
                    message: "It looks that you provided wrong e-mail or password",
                    type: "danger",
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
        }
    })


    

  return (
    <Container>
        <ReactNotifications />
        <div className={styles.card}>
            <div className={styles.desc}>
                {/* <button onClick={async () => getUSER().then(data =>
                    data?.id ? setIsLoggedIn(true) : setIsLoggedIn(false)
                    )}>GET</button> */}
                <p>LOG IN</p>
            </div>
            <div className={styles.inputs}>
                <form className={styles.form} onSubmit={signinFormik.handleSubmit}>
                    <input type="text" name='email' onChange={signinFormik.handleChange}/>
                    <input type="password" name='password' onChange={signinFormik.handleChange}/>
                    <button type='submit' className={styles.submit}>Submit</button>
                </form>

            </div>
            <div className={styles.change}>
                <p className={styles.joinUS}>Don't have an account ?</p>
                <p className={styles.joinUS}>Join us!</p>
                <Link to='/signup'>Sign up!</Link>
            </div>
        </div>
    </Container>
  )
}

export default LoginPage