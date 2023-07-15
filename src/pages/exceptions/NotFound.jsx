import { Helmet } from "react-helmet";

const NotFound = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>404 - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>
        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Halaman yang kamu tuju tidak ada pada layanan kami 😞</h1>
            <p className="font-mono text-gray-500" >404 Not Found</p>
        </div>
    </>);
}

export default NotFound;