import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom";

import {
    Home,
    App
} from '@/utils/pagesLoader';

const isLoggedIn = () => {

    // Auth logic..

    return false
}

const router = createBrowserRouter(createRoutesFromElements(
    <Route exact path='/' element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<>Not Found</>} />
    </Route>
))

export {
    isLoggedIn,
    router
}