import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Alert from "@mui/material/Alert";

import useFetch from "@/hooks/useFetch";
import { useBorrowContext } from "@/hooks/context/useBorrowContext";
import { SearchBox, BorrowedBooksCard, CardLoading, NoBook } from "@/utils/componentsLoader";

const BorrowedBooks = () => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/borrows`;
    const { borrows, dispatch } = useBorrowContext();
    const [isPending, setLoading] = useState(false);
    const [message, setMessage] = useState(false);

    useFetch({ url: baseurl, dispatch, type: 'get_borrows', setLoading, setMessage });

    // Searching
    const [searchText, setSearchText] = useState('')
    const [filteredBorrows, setFilteredBorrows] = useState([]);
    useEffect(() => setFilteredBorrows(borrows), [borrows]);

    const filter = (value) => {
        const filtered = borrows?.filter((item) =>
            item?.books?.title?.toLowerCase().includes(value.toLowerCase()) || item?.borrowedBy?.name?.toLowerCase().includes(value.toLowerCase())
        );

        filtered[0] ? setFilteredBorrows(filtered) : setFilteredBorrows([]);
    }

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Borrowed Books - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>
        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 sticky bg-white top-0">Peminjaman Buku</h1>
            <div className="search-wrapper pt-8 mb-5 sticky top-12 bg-white">
                <SearchBox
                    placeholder={'Cari berdasarkan buku atau peminjam di sini..'}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    filter={filter}
                />
            </div>
            <div className="message">
                {message.error &&
                    <Alert variant="filled" className="mb-5" severity={message.severity}>
                        {message.message}
                    </Alert>
                }
            </div>
            <div className="card-wrapper grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {!filteredBorrows.length && (isPending ? <CardLoading /> : <NoBook />)}
                {!!filteredBorrows.length && filteredBorrows?.map((borrow) => {
                    return (
                        <BorrowedBooksCard borrow={borrow} key={borrow._id} />
                    )
                })}
            </div>
        </div>
    </>);
}

export default BorrowedBooks;