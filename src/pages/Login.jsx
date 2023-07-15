import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import TimelineIcon from '@mui/icons-material/Timeline';

const Login = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Kimak E-Library</title>
            <link rel="canonical" href="http://127.0.0.1:5173/" />
        </Helmet>

        <div className="main">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <TimelineIcon sx={{ fontSize: '2em' }} className="mr-3 text-blue-600" />
                        Kimak E-Library
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Masuk melalui akun
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <TextField type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required label="Email" />
                                </div>
                                <div>
                                    <TextField type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required label="Password" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link to={'#'} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lupa Password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Masuk</button>
                            </form>
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                <button className='underline' onClick={handleOpen}>Cara Penggunaan 🛈</button>
                                <Dialog
                                    open={isOpen}
                                    onClose={handleClose}
                                >
                                    <DialogTitle>
                                        <p className="font-semibold">
                                            Tentang Aplikasi
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
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>);
}

export default Login;