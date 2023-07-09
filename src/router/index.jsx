import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom";

import {
    Home,
    App,
    BookCatalog,
    BorrowedBooks,
    About,
    Profile,
    NotFound,
    NotAuthorized
} from '@/utils/pagesLoader';

const isLoggedIn = () => {

    // Auth logic..

    return false
}

const router = createBrowserRouter(createRoutesFromElements(
    <Route exact path='/' element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='/book-catalog' element={<BookCatalog />} />
        <Route path='/borrowed-books' element={isLoggedIn() ? <BorrowedBooks /> : <NotAuthorized />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
    </Route>
))

export {
    isLoggedIn,
    router
}