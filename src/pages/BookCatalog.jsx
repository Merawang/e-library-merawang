import { useState } from "react";
import { Helmet } from "react-helmet";

import Fab from "@mui/material/Fab";
import Grow from "@mui/material/Grow";
import Alert from "@mui/material/Alert";
import AddIcon from '@mui/icons-material/Add';

import useFetch from "@/hooks/useFetch";
import { useBookContext } from "@/hooks/context/useBookContext";
import { SearchBox, BookCard, AddBook, CardLoading, NoBook } from "@/utils/componentsLoader";

const BookCatalog = () => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/books`;
    const { books, dispatch } = useBookContext();
    const [isPending, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [isOpen, setOpen] = useState(false);

    useFetch({ url: baseurl, dispatch, type: 'get_books', setLoading, setMessage });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Katalog Buku - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 sticky bg-white top-0">Katalog Buku</h1>
            <div className="search-wrapper pt-8 mb-5 sticky top-12 bg-white">
                <SearchBox />
            </div>
            {message.error &&
                <Alert variant="filled" className="mb-5" severity={message.severity}>
                    {message.message}
                </Alert>
            }
            <div className="card-wrapper grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
                {isPending ? <CardLoading /> : !!books.length ? '' : <NoBook/>}
                {!!books.length}
                {!!books.length && books?.map((book, i) => {
                    return (
                        <BookCard book={book} key={book._id} />
                    )
                })}
            </div>
            <Grow in={true} >
                <div className="button-wrapper fixed right-0 bottom-0 m-6 z-10">
                    <Fab variant="extended" color='mainBlue' aria-label="book-add" onClick={handleOpen}>
                        <AddIcon sx={{ mr: 1 }} />
                        Tambah buku
                    </Fab>
                </div>
            </Grow>
            <div className="add-book-wrapper w-full">
                <AddBook isOpen={isOpen} handleClose={handleClose} />
            </div>
        </div>
    </>);
}

export default BookCatalog;