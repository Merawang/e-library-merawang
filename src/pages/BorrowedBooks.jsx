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

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/borrows`;
    const viewList = [
        { title: 'Card', value: 'card' },
        { title: 'Table', value: 'table' }
    ]

    const { borrows, dispatch } = useBorrowContext();
    const [isPending, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [selectedView, setSelectedView] = useState({ title: 'Table', value: 'table' });
    const [borrowDetail, setBorrowDetail] = useState({});

    // Modal
    const [isOpen, setOpen] = useState(false);

    const handleOpen = (borrow) => {
        setBorrowDetail(borrow)
        setOpen(true);
    }

    const handleClose = (borrow) => {
        setOpen(false);
    }

    useFetch({ url: baseurl, dispatch, type: 'get_borrows', setLoading, setMessage });

    // Searching
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const [searchText, setSearchText] = useState('')
    const [filteredBorrows, setFilteredBorrows] = useState([]);
    useEffect(() => setFilteredBorrows(borrows), [borrows]);

    const sortList = [
        {
            title: 'Judul Buku (A-Z)',
            value: 'titleAsc'
        },
        {
            title: 'Judul Buku (Z-A)',
            value: 'titleDesc'
        },
        {
            title: 'Nama Peminjam (A-Z)',
            value: 'nameAsc'
        },
        {
            title: 'Nama Peminjam (Z-A)',
            value: 'nameDesc'
        },
        {
            title: 'Tanggal Peminjaman (Terbaru)',
            value: 'borrowedDate'
        },
    ]

    const sortBorrows = (key, data) => {
        if (key === 'titleAsc') {
            return data.sort((a, b) => a.books.title.toLowerCase().localeCompare(b.books.title.toLowerCase()));
        }
        else if (key === 'titleDesc') {
            return data.sort((a, b) => b.books.title.toLowerCase().localeCompare(a.books.title.toLowerCase()));
        }
        else if (key === 'nameAsc') {
            return data.sort((a, b) => a.borrowedBy.name.toLowerCase().localeCompare(b.borrowedBy.name.toLowerCase()));
        }
        else if (key === 'nameDesc') {
            return data.sort((a, b) => b.borrowedBy.name.toLowerCase().localeCompare(a.borrowedBy.name.toLowerCase()));
        }
        else if (key === 'borrowedDate') {
            return data.sort((a, b) => { return Date.parse(a.borrowedDate) - Date.parse(b.borrowedDate) });
        }
        else {
            return data
        }
    }

    const filter = (value = searchText, sort = selectedSort) => {
        let filtered = borrows?.filter((item) =>
            item?.books?.title?.toLowerCase().includes(value.toLowerCase()) || item?.borrowedBy?.name?.toLowerCase().includes(value.toLowerCase())
        );

        if(selectedSort){
            filtered = sortBorrows(sort, filtered);
        }

        filtered[0] ? setFilteredBorrows(filtered) : setFilteredBorrows([]);
    }

    const handleView = (event) => {
        setSelectedView((obj) => ({ ...obj, value: event.target.value }));
    }

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Peminjaman Buku - E-Library Desa Kimak</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>
        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 sticky bg-white top-0">Peminjaman Buku</h1>
            <div className="search-wrapper flex pt-8 mb-5 sticky w-full top-12 z-40 bg-white">
                <div className="change-view mr-2">
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
                <div className="search w-full">
                    <SearchBox
                        placeholder={'Cari berdasarkan buku atau peminjam di sini..'}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        filter={filter}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                        sortList={sortList}
                    />
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
            <BorrowedBooksDetail borrow={borrowDetail} isOpen={isOpen} handleClose={handleClose} />
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