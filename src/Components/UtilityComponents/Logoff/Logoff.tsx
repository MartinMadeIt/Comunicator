import styles from '../Logoff/Logoff.module.scss'
import { CgLogOff } from "react-icons/cg";
import { useAuthContext } from '../../../Contexts/Authorisation/AuthContext';
import { ClickEventButtonType } from '../../../types';
import { supabase } from '../../../databaseClient';



function Logoff() {

    const {setIsLoggedIn} = useAuthContext()

    async function signOUT () {
        const { error } = await supabase.auth.signOut()
        setIsLoggedIn(false)
    }

    return (
        <button className={styles.logoffBtn} onClick={signOUT}>
            <CgLogOff />
        </button>
    )
}

export default Logoff