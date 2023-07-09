import { Helmet } from "react-helmet";
import { SearchBox, BookCard } from "@/utils/componentsLoader";

const BookCatalog = () => {
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
                {[1, 2, 3, 4, 5, 6].map(() => {
                    return (
                        <div className="card">
                            <BookCard />
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
}

export default BookCatalog;