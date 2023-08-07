import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import QrCode2Icon from '@mui/icons-material/QrCode2';

import { useBorrowContext } from "@/hooks/context/useBorrowContext";
import { useDisplayContext } from '@/hooks/context/useDisplayContext';
import useAdd from '@/hooks/useAdd';

const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const AddBorrowedBook = ({ book, isOpen, handleClose }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/borrows`;
    const navigate = useNavigate();
    const { dispatch } = useBorrowContext();
    const { isPending, message, setLoading, setMessage } = useDisplayContext();

    // Forms
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [borrowedDate, setBorrowedDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [books, setBooks] = useState(book?._id);

    const newBorrow = { borrowedBy: { name, address, phoneNumber }, borrowedDate, dueDate, books };

    const { handleAdd } = useAdd({ url: baseurl, dispatch, type: 'added_borrow', setMessage, setLoading });

    const handleSubmit = (e, payload) => {
        if (!name.length || !address.length || !phoneNumber.length || !borrowedDate.length || !dueDate.length || !books.length) {
            setMessage({ error: true, severity: 'error', message: 'Input harus diisi semua!' });
        }
        else {
            handleAdd(e, payload);
            handleClose();
            navigate('/borrowed-books');

        }
    }

    const handleFill = ({ name, address, phoneNumber, borrowedDate, dueDate, books }) => {
        setName(name);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setBorrowedDate(borrowedDate);
        setDueDate(dueDate);
        setBooks(books);
    }

    return (<>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold mb-2">Tambah Peminjaman Buku</p>
            </DialogTitle>

            <form action="" method="post">
                <DialogContent>
                    <div className="content-wrapper">
                        <div className="info mb-2">
                            <DialogContentText>Tambah peminjaman buku untuk mendata siapa saja yang meminjam buku</DialogContentText>
                        </div>
                        <div className="message">
                            {message.error &&
                                <Alert variant="filled" className="mb-5" severity={message.severity}>
                                    {message.message}
                                </Alert>
                            }
                        </div>
                        <div className="input">
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                label="Nama Peminjam"
                                placeholder='Contoh: Albert Einstein'
                                id="name"
                                margin='dense'
                                size='small'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                label="Alamat Peminjam"
                                placeholder='Contoh: Jalan Pramuka No 59, Kutoarjo'
                                id="address"
                                margin='dense'
                                size='small'
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                label="No. HP Peminjam"
                                placeholder='Contoh: 081123123123'
                                id="phoneNumber"
                                margin='dense'
                                size='small'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setBorrowedDate(e.target.value)}
                                value={borrowedDate}
                                label="Tanggal Peminjaman"
                                placeholder='Contoh: 2020-02-20'
                                id="borrowedDate"
                                margin='dense'
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setDueDate(e.target.value)}
                                value={dueDate}
                                label="Tanggal Jatuh Tempo"
                                placeholder='Contoh: 2020-02-28'
                                id="dueDate"
                                margin='dense'
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isPending} color='mainBlue' variant='text' sx={{ m: 1 }} onClick={handleClose}>Tutup</Button>
                    <Button disabled={isPending} color='mainBlue' variant='text' sx={{ m: 1 }} onClick={() => handleFill({
                        name: '',
                        address: '',
                        phoneNumber: '',
                        borrowedDate: '',
                        dueDate: ''
                    })}>Clear</Button>
                    <Button color='mainBlue' disabled={isPending} type='submit' variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit(e, newBorrow)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Tambah'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default AddBorrowedBook;