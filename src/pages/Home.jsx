import { useState } from 'react';
import { Helmet } from 'react-helmet';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

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

        <h1 className="text-black font-bold text-2xl mb-5">Selamat Datang, <span className='text-blue-600'>{username}</span></h1>
        <div className="md:flex md:justify-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti adipisci suscipit est, unde deleniti quaerat assumenda molestiae exercitationem corporis! Autem voluptatum nobis officiis iusto atque, eligendi dolores enim praesentium. Facilis aperiam excepturi veritatis, at quae minima ipsam, voluptates asperiores atque eius quam sunt illo quidem qui? Non quisquam debitis assumenda officia pariatur quia, tenetur eveniet laboriosam nobis error explicabo voluptatem eum optio aut, consequatur aperiam? Et voluptates possimus, id ducimus reiciendis sit officiis iste aut sint nesciunt blanditiis repellendus laboriosam placeat ad nobis iure excepturi dolorum. Possimus repellat quibusdam, recusandae qui necessitatibus quisquam commodi beatae reiciendis ratione quos pariatur unde molestias? Fuga quibusdam eius dolorum vel ea optio adipisci similique ducimus, dicta, tempore pariatur distinctio voluptate qui dolores, voluptatum a enim. Sed magni tenetur labore, consequatur non quidem suscipit eum deserunt, voluptate praesentium perferendis pariatur, quia fuga modi? Aliquid autem, a excepturi soluta nostrum consectetur ducimus quod, cumque quas amet ipsam cum libero ab esse architecto doloremque fuga error ipsum quibusdam magni quasi. Perspiciatis suscipit odio fugit. Autem tempore temporibus necessitatibus ipsa sint consectetur impedit, alias dolores nobis officiis ipsum maxime quisquam distinctio quia nisi sapiente quibusdam nesciunt, sit laudantium laboriosam molestias eos minima. Cumque veniam voluptates beatae culpa rerum.
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
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iusto aliquam repudiandae ea ipsa vero nisi tempore assumenda, eaque perspiciatis.
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