import { Helmet } from "react-helmet";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { useDisplayContext } from "@/hooks/context/useDisplayContext";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import useSignOut from "../hooks/useSignOut";



const Profile = () => {

    const { isPending, setLoading, message, setMessage } = useDisplayContext();
    const { dispatch } = useAuthContext();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const username = user?.name || 'Pengguna';
    const email = user?.email || '-'

    const { handleSignOut } = useSignOut({ dispatch, type: 'signout', setMessage, setLoading })

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Profil - E-Library Desa Kimak</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Profil</h1>
            <h4 className="font-semibold text-lg mb-2">Informasi Akun</h4>
            <div className="message">
                {message.error &&
                    <Alert variant="filled" className="mb-5" severity={message.severity}>
                        {message.message}
                    </Alert>
                }
            </div>
            <div className="info mb-5">
                <p>Username: {username}</p>
                <p>Email: {email}</p>
            </div>
            <h4 className="font-semibold text-lg mb-2">Keluar Akun?</h4>
            <Button variant="contained" color="mainBlue" onClick={(e) => handleSignOut(e)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Keluar Akun'}</Button>
        </div>
    </>);
}

export default Profile;