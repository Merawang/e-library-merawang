import Button from "@mui/material/Button";
import { Helmet } from "react-helmet";



const Profile = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Profile - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Profil</h1>
            <h4 className="font-semibold text-lg mb-2">Informasi Akun</h4>
            <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit cumque, vero suscipit dolor, eveniet accusantium magni eaque a error officia quo quasi. Laborum culpa, facilis aspernatur tempore architecto totam natus.</p>
            <h4 className="font-semibold text-lg mb-2">Keluar Akun</h4>
            <Button variant="contained" color="mainBlue">Keluar akun</Button>
        </div>
    </>);
}

export default Profile;