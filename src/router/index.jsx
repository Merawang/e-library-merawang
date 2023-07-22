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
    NotAuthorized,
    Login
} from '@/utils/pagesLoader';

const isLoggedIn = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    return !!user
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route exact path='' element={<App />}>
            <Route path='' element={<Home />} />
            <Route path='book-catalog' element={<BookCatalog />} />
            <Route path='borrowed-books' element={isLoggedIn() ? <BorrowedBooks /> : <NotAuthorized />} />
            <Route path='about' element={<About />} />
            <Route path='profile' element={isLoggedIn() ? <Profile /> : <Navigate to='/auth/login' />} />
            <Route path='*' element={<NotFound />} />
        </Route>
        <Route exact path='auth' element={isLoggedIn() ? <Navigate to='/' /> : <Login />}>
            <Route path='login' element={<Login />} />
        </Route>
    </>
))

export {
    isLoggedIn,
    router
}