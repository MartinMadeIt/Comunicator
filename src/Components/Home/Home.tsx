import Container from "../UtilityComponents/Container/Container"
import Logoff from "../UtilityComponents/Logoff/Logoff"
import { fetchAllRows } from "../../Controllers/FilterAPI"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessageBox from "../UtilityComponents/MessageBox/MessageBox";
import styles from "./Home.module.scss"
import { getThisUsername, getUSER, sendMessage } from "../../Controllers/ManageLoginState";
import { useFormik } from "formik";
import { FiSend } from "react-icons/fi";
import { CiPause1 } from "react-icons/ci";

interface Users {
  user_id: string   /* primary key */;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

interface Messages {
  user_id: string   /* primary key */;
  created_at?: string;
  comment?: string;
  username?: string   /* foreign key to users.username */;
  users?: Users;
};

function Home() {

  const [data, setData] = useState<Messages[]>([])
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [pause, setPause] = useState(false)

  const bottom = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    bottom.current?.scrollIntoView({behavior: 'smooth'})
  }, [data])

  useEffect(() => {
    fetchAllRows<Messages[]>('messages').then(data => {
      setData(data)
    })
  }, [refresh])

  useEffect(() => {
    if(!pause)
    {setTimeout(() => {
      setRefresh(!refresh)
    }, 2000)}
  }, [refresh, pause])

  // useEffect(() => {
  //   getUSER().then(data => 
  //       setUserId(data?.id ? data.id : "")
  //     )
  // }, [])

  // useEffect(() => {
  //   getThisUsername(userId).then(data => setUsername(data ? data[0].username : ""))
  // }, [])


  /*  Wyciąganie username na podstawie user_id  */
  const getUserID = async () => getUSER()
    .then(data => {
      setUserId(data?.id ? data.id : "")
      return data})
    .then(data => {
      getThisUsername(data?.id ? data.id : "").then(data => setUsername(data ? data[0].username : ""))
    })

  useEffect(() => {getUserID()},[])


  const messageFormik = useFormik({
    initialValues : {
      message : ""
    }, 
    onSubmit: (values) => {
      sendMessage(
        userId,
        username,
        values.message
    )
    }
  })

  const getFormattedDate = (date:string) => {
    const unformatted = new Date(date)
    return `${unformatted.getDate()}-${unformatted.getMonth()+1}-${unformatted.getFullYear()} \t ${unformatted.getHours()}:${unformatted.getMinutes()}`
  }

 



  return (
    <Container>
        <Logoff />
        <p className={styles.accountUsername}>{username}</p>
        <button onClick={() => setPause(!pause)} className={!pause ? styles.pauseButton : styles.pauseButtonActive}><CiPause1 /></button>

        <div className={styles.layout}>

          <div className={styles.boxField} id="boxField">
            {data.map((element, index) => 
            {
              
              return (
              <MessageBox 
              username={userId === element.user_id  ? "You" : String(element.username)} 
              message={element.comment ? element.comment : ""} 
              createdAt={element.created_at ? String(getFormattedDate(element.created_at)) : ""} 
              isAuthor={userId === element.user_id}
              key = {index}
              />
              
            )}
            )} 
            <div ref={bottom} />
          </div>

          <form className={styles.inputMessage} onSubmit={messageFormik.handleSubmit}>
            <textarea name="message" className={styles.textArea} cols={50} rows={1} maxLength={600} onChange={messageFormik.handleChange}/>
            <button type="submit" className={styles.submit}><FiSend/></button>
          </form>

        </div>

    </Container>
  )
}

export default Home