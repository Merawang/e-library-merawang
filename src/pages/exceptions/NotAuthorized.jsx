import { Helmet } from "react-helmet";

const NotAuthorized = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>403 - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>
        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Halaman hanya bisa diakses oleh admin 🙅‍♂️</h1>
            <p className="font-mono text-gray-500" >403 Forbidden Error</p>
        </div>
    </>);
}

export default NotAuthorized;