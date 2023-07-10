import { Helmet } from "react-helmet";

import Fab from "@mui/material/Fab";
import Grow from "@mui/material/Grow";
import AddIcon from '@mui/icons-material/Add';

import { SearchBox, BookCard } from "@/utils/componentsLoader";

const BookCatalog = () => {
    const books = [
        {
            _id: "64a77cc7f01a763dfae36077",
            title: "Bite-size Franklin",
            imageUrl: "http://books.google.com/books/content?id=40zABQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            authors: [
                "John P. Holms",
                "Karin Baji"
            ],
            publicationDate: "2015-01-13T00:00:00.000Z",
            publisher: "Macmillan",
            isbn: "9781466889682",
            subjects: [
                "References"
            ],
            ddc: "100",
            lcc: "100",
            callNumber: "081393789949",
            pageCount: 112,
            description: "As a bestselling author and our nation's earliest spokesman, Benjamin Franklin brilliantly extolled virtues of temperance, industry, and self-reliance --character traits which throughout our history have been celebrated as both personally liberating and quintessentially American. In this next installment of the highly successful Bite-Size series, Bite-Size Franklin draws some practical wisdom, and more than a few laughs, from Franklin's intimate letters, scientific essays, newspaper articles, and revolutionary writings, as well as from the pages of career advice, aphorisms, and humorous verse he weaved together in his Autobiography, and in his yearly publication Poor Richard's Almanac.",
            isAvailable: true,
            stock: 2,
            createdAt: "2023-07-07T02:47:35.628Z",
            updatedAt: "2023-07-09T11:01:53.686Z",
            __v: 0
        },
        {
            _id: "64a77cc7f01a763dfae36077",
            title: "Linear Algebra 8th Edition",
            imageUrl: "http://books.google.com/books/content?id=efbxjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            authors: [
                "John P. Holms",
                "Karin Baji"
            ],
            publicationDate: "2015-01-13T00:00:00.000Z",
            publisher: "Macmillan",
            isbn: "9781466889682",
            subjects: [
                "References"
            ],
            ddc: "100",
            lcc: "100",
            callNumber: "081393789949",
            pageCount: 112,
            description: "As a bestselling author and our nation's earliest spokesman, Benjamin Franklin brilliantly extolled virtues of temperance, industry, and self-reliance --character traits which throughout our history have been celebrated as both personally liberating and quintessentially American. In this next installment of the highly successful Bite-Size series, Bite-Size Franklin draws some practical wisdom, and more than a few laughs, from Franklin's intimate letters, scientific essays, newspaper articles, and revolutionary writings, as well as from the pages of career advice, aphorisms, and humorous verse he weaved together in his Autobiography, and in his yearly publication Poor Richard's Almanac.",
            isAvailable: false,
            stock: 1,
            createdAt: "2023-07-07T02:47:35.628Z",
            updatedAt: "2023-07-09T11:01:53.686Z",
            __v: 0
        }
    ]

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Katalog Buku - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <h1 className="font-bold text-2xl text-blue-600 mb-5">Katalog Buku</h1>
            <div className="search-wrapper mb-5">
                <SearchBox />
            </div>
            <div className="card-wrapper grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {books.map((book) => {
                    return (
                        <div className="card">
                            <BookCard book={book} />
                        </div>
                    )
                })}
            </div>
            <Grow in={true}>
                <div className="button-wrapper fixed right-0 bottom-0 m-6 z-10">
                    <Fab variant="extended" color='mainBlue' aria-label="book-add">
                        <AddIcon sx={{ mr: 1 }} />
                        Tambah buku
                    </Fab>
                </div>
            </Grow>
        </div>
    </>);
}

export default BookCatalog;