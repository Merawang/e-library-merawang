import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import TimelineIcon from '@mui/icons-material/Timeline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useDisplayContext } from "@/hooks/context/useDisplayContext";
import useSignIn from "@/hooks/useSignIn";

const Login = () => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/auth/signin`;
    const navigate = useNavigate();

    const { user, dispatch } = useAuthContext();
    const { isPending, setLoading, message, setMessage } = useDisplayContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const body = { email, password };

    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { handleSignIn } = useSignIn({ url: baseurl, dispatch, type: 'signin', setLoading, setMessage });

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Peminjaman Buku</title>
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
                            <div className="message">
                                {message.error &&
                                    <Alert variant="filled" className="mb-5" severity={message.severity}>
                                        {message.message}
                                    </Alert>
                                }
                            </div>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <TextField
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        label="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                        label="Password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword((show) => !show)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="button flex space-x-2 justify-center items-center">
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        className="h-fit w-full text-blue-600 outline outline-1 -outline-offset-1 outline-blue-600 hover:outline-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={(e) => navigate('/')}
                                    >{isPending ? <CircularProgress color='inherit' size={20} /> : 'KEMBALI'}</button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="h-fit w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={(e) => handleSignIn(e, body)}
                                    >{isPending ? <CircularProgress color='inherit' size={20} /> : 'SIGN IN'}</button>
                                </div>
                            </form>
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                <button className='underline' disabled={isPending} onClick={handleOpen}>Cara Penggunaan 🛈</button>
                                <Dialog
                                    open={isOpen}
                                    onClose={handleClose}>
                                    <DialogTitle>
                                        <p className="font-semibold">
                                            Tentang Aplikasi
                                        </p>
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Login menggunakan akun yang sudah diberi oleh Admin. Apabila terdapat kendala, hubungi akun instagram <a className="underline text-blue-600" target="_blank" href="https://www.instagram.com/seterangmerawang/">@seterangmerawang</a> atau hubungi <a className="underline text-blue-600" target="_blank" href="https://wa.me/6281393789949">admin</a>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button disabled={isPending} onClick={handleClose}>OK</Button>
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