import { NavLink } from 'react-router-dom';

import TimelineIcon from '@mui/icons-material/Timeline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';


const Navbar = ({ }) => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const username = user?.name || 'Pengguna';

    const isLoggedIn = () => {
        return !!user
    }

    return (<>
        <nav className="w-full fixed top-0 left-0 right-0 shadow bg-white z-50 flex items-center justify-center">
            <div className="container flex flex-row justify-between px-6 py-2">
                <div className="content-left">
                    <NavLink to={'/'} className='flex flex-row justify-center items-center gap-2'>
                        <img src="logoKKNpng.png" alt="Logo KKN Seterang Merawang" width={50}/>
                        <h1 className="text-xl font-bold text-gray-800">E-Library - <span className='text-blue-600'>Desa Kimak</span></h1>
                    </NavLink>
                </div>
                <div className="content-right flex flex-row gap-4 justify-center items-center">
                    <NavLink to={'/book-catalog'} className={({ isActive }) => isActive ? "text-blue-500 transition-all" : "text-black" + "flex flex-row justify-center items-center gap-2 transition-all"}>
                        <div className="book-catalog font-semibold flex flex-row gap-2">
                            <LibraryBooksIcon className='text-sm' />
                            <p>Katalog Buku</p>
                        </div>
                    </NavLink>
                    {isLoggedIn() &&
                        <NavLink to={'/borrowed-books'} className={({ isActive }) => isActive ? "text-blue-500 transition-all" : "text-black" + "flex flex-row justify-center items-center gap-2 transition-all"}>
                            <div className="borrowed-books font-semibold flex flex-row gap-2">
                                <BookIcon className='text-sm' />
                                <p>Peminjaman Buku</p>
                            </div>
                        </NavLink>
                    }
                    <NavLink to={'/about'} className={({ isActive }) => isActive ? "text-blue-500 transition-all" : "text-black" + "flex flex-row justify-center items-center gap-2 transition-all"}>
                        <div className="about font-semibold flex flex-row gap-2">
                            <InfoIcon className='text-sm' />
                            <p>Tentang</p>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className={({ isActive }) => isActive ? "bg-blue-600 text-white py-2 px-4 rounded-full transition-all" : "flex flex-row justify-center items-center gap-2 text-black transition-all"}>
                        <div className='flex flex-row gap-2'>
                            {isLoggedIn() ?
                                <>
                                    <PersonIcon className='text-sm' />
                                    <p>{username}</p>
                                </>
                                :
                                <>
                                    <LoginIcon className='text-sm' />
                                    <p>Sign In</p>
                                </>
                            }
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav >
    </>);
}

export default Navbar;