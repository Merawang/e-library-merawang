import { Helmet } from "react-helmet";

const BorrowedBooks = () => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Borrowed Books - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>
        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Borrowed Books</h1>
        </div>
    </>);
}

export default BorrowedBooks;