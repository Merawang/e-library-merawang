import { Helmet } from "react-helmet";

const Login = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Login</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia sapiente ratione eveniet, officia odit maxime expedita, quam voluptates deleniti assumenda accusantium corporis tenetur corrupti aut maiores neque sequi fugiat itaque enim quia commodi. Voluptatum in, quod tempora voluptate est placeat esse libero quaerat illum impedit obcaecati rem modi consequuntur blanditiis.</p>
        </div>
    </>);
}

export default Login;