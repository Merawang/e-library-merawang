import { useState } from 'react';
import { Helmet } from 'react-helmet';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Groups3Icon from '@mui/icons-material/Groups3';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const username = user?.name || 'Pengguna';

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <h1 className="text-black font-bold text-2xl mb-5">Selamat Datang, <span className='text-blue-600'>{username}!</span></h1>
        <div className="intro">
            Di tengah kemajuan teknologi dan kebutuhan akan informasi yang semakin meningkat, kami dengan bangga mempersembahkan <span className='font-bold inline'>E-Library Desa Kimak</span>, sebuah perpustakaan digital yang berdedikasi untuk membawa wawasan dan pengetahuan kepada seluruh warga Desa Kimak.
        </div>
        <div className="feature mt-5">
            <h2 className='font-semibold text-xl mb-5' >Apa saja yang bisa dilakukan <span className='font-bold inline'>E-Library Desa Kimak</span>?</h2>
            <div className="cards flex w-full gap-6">
                <div className='card basis-1/4 p-5 flex flex-col outline outline-1 outline-gray-200 shadow-md rounded justify-center items-center transition-all group hover:bg-blue-600'>
                    <h4 className='font-bold text-xl mb-2 group-hover:text-white'>Akses 24/7</h4>
                    <AccessTimeIcon className='mb-2 text-blue-600 group-hover:text-white' sx={{ fontSize: 50 }} />
                    <p className='text-center group-hover:text-white'>Nikmati akses ke perpustakaan digital kami kapan pun dan di mana pun Anda berada.</p>
                </div>
                <div className='card basis-1/4 p-5 flex flex-col outline outline-1 outline-gray-200 shadow-md rounded justify-center items-center transition-all group hover:bg-blue-600'>
                    <h4 className='font-bold text-xl mb-2 group-hover:text-white'>Koleksi Beragam</h4>
                    <MenuBookIcon className='mb-2 text-blue-600 group-hover:text-white' sx={{ fontSize: 50 }} />
                    <p className='text-center group-hover:text-white'>Kumpulan buku digital kami terus berkembang dan beragam.</p>
                </div>
                <div className='card basis-1/4 p-5 flex flex-col outline outline-1 outline-gray-200 shadow-md rounded justify-center items-center transition-all group hover:bg-blue-600'>
                    <h4 className='font-bold italic text-xl mb-2 group-hover:text-white'>User-friendly</h4>
                    <Groups3Icon className='mb-2 text-blue-600 group-hover:text-white' sx={{ fontSize: 50 }} />
                    <p className='text-center group-hover:text-white'>Dirancang agar mudah digunakan oleh siapa pun.</p>
                </div>
                <div className='card basis-1/4 p-5 flex flex-col outline outline-1 outline-gray-200 shadow-md rounded justify-center items-center transition-all group hover:bg-blue-600'>
                    <h4 className='font-bold italic text-xl mb-2 group-hover:text-white'>Multi-platform</h4>
                    <MobileFriendlyIcon className='mb-2 text-blue-600 group-hover:text-white' sx={{ fontSize: 50 }} />
                    <p className='text-center group-hover:text-white'>Dapat diakses di berbagai perangkat yang Anda miliki.</p>
                </div>
            </div>
        </div>
        <div className="text-center mt-24 font-semibold underline text-gray-400">
            <button className='underline' onClick={handleOpen}>Cara Penggunaan 🛈</button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    <p className="font-semibold">
                        Cara Penggunaan
                    </p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bukalah Katalog Buku untuk melihat buku favorit kamu. Apabila penasaran lebih lanjut, kamu dapat klik <span>Baca Google Books</span> untuk membaca buku secara lebih lengkap, dengan catatan hanya beberapa buku saja yang dapat diakses full.
                        <br/><br/>
                        Contact support: <a href="https://wa.me/6281393789949" className='underline text-blue-500'>@seterangmerawang</a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    </>);
}

export default Home;