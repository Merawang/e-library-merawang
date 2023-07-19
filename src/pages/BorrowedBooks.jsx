import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import useFetch from "@/hooks/useFetch";
import { useBorrowContext } from "@/hooks/context/useBorrowContext";
import { SearchBox, BorrowedBooksCard, BorrowedBooksDetail, CardLoading, NoBook, BorrowedBooksTable } from "@/utils/componentsLoader";

const BorrowedBooks = () => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/borrows`;
    const viewList = [
        { title: 'Card', value: 'card' },
        { title: 'Table', value: 'table' }
    ]

    const { borrows, dispatch } = useBorrowContext();
    const [isPending, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [selectedView, setSelectedView] = useState({ title: 'Card', value: 'card' });

    // Modal
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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

    const handleView = (event) => {
        setSelectedView((obj) => ({ ...obj, value: event.target.value }));
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
                <div className="change-view text-end">
                    <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                        <InputLabel id="demo-select-small-label">View</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectedView.value}
                            label="View"
                            onChange={handleView}
                        >
                            {!!viewList.length && viewList.map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="message">
                {message.error &&
                    <Alert variant="filled" className="mb-5" severity={message.severity}>
                        {message.message}
                    </Alert>
                }
            </div>
            <div className="error">
                {!filteredBorrows.length && (isPending ? <CardLoading /> : <NoBook />)}
            </div>
            <div className="book-detail">
                {!!filteredBorrows.length && filteredBorrows?.map((borrow) => {
                    return (
                        <BorrowedBooksDetail borrow={borrow} isOpen={isOpen} handleClose={handleClose} />
                    )
                })}
            </div>
            {selectedView.value === 'card' ?
                <div className="card-wrapper grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {!!filteredBorrows.length && filteredBorrows?.map((borrow) => {
                        return (
                            <BorrowedBooksCard borrow={borrow} key={borrow._id} isOpen={isOpen} handleOpen={handleOpen} handleClose={handleClose} />
                        )
                    })}
                </div>
                :
                <div className="table-wrapper">
                    {!!filteredBorrows.length &&
                        <BorrowedBooksTable borrows={filteredBorrows} isOpen={isOpen} handleOpen={handleOpen} handleClose={handleClose} />
                    }
                </div>
            }
        </div>
    </>);
}

export default BorrowedBooks;