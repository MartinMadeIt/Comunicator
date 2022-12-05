
import 'react-notifications-component/dist/scss/notification.scss'
import { Store } from 'react-notifications-component';

export const loginSuccess =  Store.addNotification({
    title: "Logged In",
    message: "Welcome!",
    type: "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 3000,
        onScreen: true
      }
  });

export const loginFail = Store.addNotification({
    title: "Nope",
    message: "Wrong password or username",
    type: "warning",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 3000,
        onScreen: true
      }
  });

  //    Chcę tak:
//   const loginF = {
//     title: "Nope",
//     message: "Wrong password or username",
//     type: "warning",
//     insert: "top",
//     container: "top-left",
//     animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
//     animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
//     dismiss: {
//         duration: 3000,
//         onScreen: true
//       }
//   }

// export const loginFailed = {
//     ...loginF,
//     esrtosc_ktora_chce_zmienic
// }