import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import LoginPage from './Components/LoginPage/LoginPage';
import SignUpPage from './Components/SignInPage/SignUpPage';
import NoAccess from './Components/UtilityComponents/NoAccess/NoAccess';
import Wrapper from './Components/UtilityComponents/Wrapper/Wrapper';
import { useAuthContext } from './Contexts/Authorisation/AuthContext';
import { getUSER } from './Controllers/ManageLoginState';


function App() {

  const {isLoggedIn, setIsLoggedIn} = useAuthContext()

  const checkIfIsLogged = async () => getUSER().then(data => 
    setIsLoggedIn(data?.id ? true : false)
  )

  useEffect(() => {
    !isLoggedIn ? checkIfIsLogged() : console.log("Not logged");
  }, [])

  return (
      <Wrapper>
        <Routes>

          <Route element={!isLoggedIn && <SignUpPage />} path="/signup"/>
          <Route element={!isLoggedIn && <LoginPage />} path="/login"/>
          <Route element={isLoggedIn ? <Home /> : <NoAccess />} path="/"/>
          

        </Routes>
      </Wrapper>
  );
}

export default App;
