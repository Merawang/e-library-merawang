import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Fab from "@mui/material/Fab";
import Grow from "@mui/material/Grow";
import Alert from "@mui/material/Alert";
import AddIcon from '@mui/icons-material/Add';

import useFetch from "@/hooks/useFetch";
import { useBookContext } from "@/hooks/context/useBookContext";
import { SearchBox, BookCard, AddBook, CardLoading, NoBook } from "@/utils/componentsLoader";
import { useDisplayContext } from "@/hooks/context/useDisplayContext";

const BookCatalog = () => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { books, dispatch } = useBookContext();
    const { isPending, setLoading, message, setMessage } = useDisplayContext();

    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [isOpen, setOpen] = useState(false);

    useFetch({ url: baseurl, dispatch, type: 'get_books', setLoading, setMessage });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Searching and Sorting
    const [searchText, setSearchText] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([]);
    useEffect(() => setFilteredBooks(books), [books]);

    const sortList = [
        {
            title: 'Nama (A-Z)',
            value: 'nameAsc'
        },
        {
            title: 'Nama (Z-A)',
            value: 'nameDesc'
        },
        {
            title: 'Stok',
            value: 'stock'
        },
    ]

    const sortBooks = (key, data) => {
        if (key === 'nameAsc') {
            return data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        }
        else if (key === 'nameDesc') {
            return data.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        }
        else {
            return data
        }
    }

    const filter = (value = searchText, sort = selectedSort) => {
        let filtered = books?.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
        );

        if (selectedSort) {
            filtered = sortBooks(sort, filtered);
        }

        filtered[0] ? setFilteredBooks(filtered) : setFilteredBooks([]);
    }

    // Auth check

    const isLoggedIn = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return !!user
    }

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Katalog Buku - E-Library Desa Kimak</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 sticky bg-white top-0">Katalog Buku</h1>
            <div className="search-wrapper pt-8 mb-5 sticky top-12 z-40 bg-white">
                <SearchBox
                    placeholder={'Cari buku kesukaanmu di sini..'}
                    searchText={searchText}
                    filter={filter}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    selectedSort={selectedSort}
                    sortList={sortList}
                />
            </div>
            <div className="message">
                {message.error &&
                    <Alert variant="filled" className="mb-5" severity={message.severity}>
                        {message.message}
                    </Alert>
                }
            </div>
            {/* <div className="card-wrapper grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 "> */}
            <div className="card-wrapper columns-xs gap-6">
                {!filteredBooks.length && (isPending ? <CardLoading /> : <NoBook handleOpen={handleOpen} />)}
                {!!filteredBooks.length && filteredBooks?.map((book, i) => {
                    return (
                        <BookCard book={book} key={book._id} />
                    )
                })}
            </div>
            {isLoggedIn() &&
                <div className="add-book">
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
            }
        </div>
    </>);
}

export default BookCatalog;