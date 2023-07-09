import TimelineIcon from '@mui/icons-material/Timeline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';


const Navbar = ({ children }) => {

    const username = "SeterangMerawang";

    const isLoggedIn = () => {
        return false;
    }

    return (<>
        <nav className="w-full fixed top-0 left-0 right-0 shadow bg-white z-50 flex items-center justify-center">
            <div className="container flex flex-row justify-between px-6 py-2">
                <div className="content-left">
                    <NavLink to={'/'} className='flex flex-row justify-center items-center gap-2'>
                        <TimelineIcon className='text-blue-600' sx={{ fontSize: '3em' }} />
                        <h1 className="text-xl font-bold text-gray-800">Kimak E-Library</h1>
                    </NavLink>
                </div>
                <div className="content-right flex flex-row gap-4 justify-center items-center">
                    <NavLink to={'/book-catalog'} className='flex flex-row justify-center items-center gap-2'>
                        <div className="book-catalog font-semibold flex flex-row gap-2">
                            <LibraryBooksIcon className='text-sm' />
                            <p>Katalog Buku</p>
                        </div>
                    </NavLink>
                    {isLoggedIn() &&
                        <NavLink to={'/borrowed-books'} className='flex flex-row justify-center items-center gap-2'>
                            <div className="borrowed-books font-semibold flex flex-row gap-2">
                                <BookIcon className='text-sm' />
                                <p>Peminjaman Buku</p>
                            </div>
                        </NavLink>
                    }
                    <NavLink to={'/about'} className='flex flex-row justify-center items-center gap-2'>
                        <div className="about font-semibold flex flex-row gap-2">
                            <InfoIcon className='text-sm' />
                            <p>Tentang</p>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className='flex flex-row justify-center items-center gap-2'>
                        <div className="profile font-semibold bg-blue-600 text-white py-2 px-4 rounded-full">
                            <div className='flex flex-row gap-2'>
                                <PersonIcon className='text-sm' />
                                <p>{username}</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;