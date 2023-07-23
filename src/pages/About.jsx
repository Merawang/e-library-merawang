import { Helmet } from "react-helmet";

const About = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>About - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Tentang</h1>
            <p>Dikembangkan sepenuh hati oleh Tim KKN PPN UGM Merawang 💖</p>
        </div>
    </>);
}

export default About;
