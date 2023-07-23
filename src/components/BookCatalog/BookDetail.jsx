import { forwardRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Grow from '@mui/material/Grow';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import GoogleIcon from '@mui/icons-material/Google';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDelete from '../../hooks/useDelete';

import { useDisplayContext } from '@/hooks/context/useDisplayContext';
import { useBookContext } from '@/hooks/context/useBookContext';
import useRead from '@/hooks/useRead';


const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const BookDetail = ({ book, isOpen, handleClose }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { dispatch } = useBookContext();
    const { isPending, setLoading, setMessage } = useDisplayContext();

    const { handleDelete } = useDelete({ url: baseurl, dispatch, type: 'deleted_book', setMessage, setLoading })

    const handleSubmit = (e, id, title) => {
        handleDelete(e, id, title);
        handleClose();
    }

    const handleRead = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        useRead({ url: `${baseurl}/search?q=${book?.isbn}`, setLoading, setMessage });
    }

    const isLoggedIn = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return !!user
    }

    return (<>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold mb-2">{book?.title}</p>
                <div className="category-tags flex flex-row gap-1 mb-2">
                    {book.subjects && book?.subjects.map((subject, i) => {
                        return (<Chip size='small' label={subject} key={i} />)
                    })}
                </div>
            </DialogTitle>

            <DialogContent>
                <div className="wrapper flex flex-row h-[30rem] gap-4">
                    <div className="image basis-1/3">
                        <img src={book?.imageUrl} alt={book?.title} loading='lazy' className='w-full' />
                        <div className="flex flex-row gap-2 mt-2 status-tags absolute">
                            <p>Status: </p>
                            {book?.isAvailable ?
                                <Chip size='small' icon={<DoneIcon />} color="success" label={`Tersedia (${book?.stock})`} className='shadow' />
                                :
                                <Chip size='small' icon={<BlockIcon />} color="warning" label="Stok habis" className='shadow' />
                            }

                        </div>
                    </div>
                    <div className="content-right basis-2/3 h-full text-base overflow-y-auto">
                        <div className="detail-info mb-5">
                            <p id='authors'><span className='font-bold'>Penulis:</span> {book.authors && book?.authors.map((author, i, arr) => {
                                return (arr.length - 1 !== i) ? `${author}, ` : `${author}`
                            })} </p>
                            <p id="publisher"><span className='font-bold'>Publisher:</span> {book?.publisher}</p>
                            <p id="publicationDate"><span className='font-bold'>Tanggal Publikasi:</span> {book?.publicationDate?.split('T')[0]}</p>
                            <p id="isbn"><span className='font-bold'>ISBN:</span> {book?.isbn}</p>
                            <p id="ddc"><span className='font-bold'>DDC:</span> {book?.ddc}</p>
                            <p id="lcc"><span className='font-bold'>LCC:</span> {book?.lcc}</p>
                            <p id="pageCount"><span className='font-bold'>Jumlah Halaman:</span> {book?.pageCount}</p>
                        </div>
                        {
                            isLoggedIn() &&
                            <div className="button flex flex-row space-x-2 mb-5">
                                <div className="edit-wrapper">
                                    <Button size='small' color='warning' variant='contained' endIcon={<EditIcon color='' size='small' />}>Edit</Button>
                                </div>
                                <div className="delete-wrapper">
                                    <Button size='small' color='error' variant='contained' endIcon={<DeleteIcon color='' size='small' />} onClick={(e) => handleSubmit(e, book?._id, book?.title)}>Hapus</Button>
                                </div>
                            </div>
                        }
                        <DialogContentText>
                            {book?.description}
                        </DialogContentText>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='mainBlue' variant='text' sx={{ m: 1 }} onClick={handleClose}>Tutup</Button>
                <Button color='mainBlue' endIcon={<GoogleIcon color='' size='small' />} variant={isLoggedIn() ? 'outlined' : 'contained'} sx={{ m: 1 }} onClick={(e) => handleRead(e)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Baca Google Books'}</Button>
                {isLoggedIn() && <Button color='mainBlue' variant='contained' sx={{ m: 1 }}>Pinjam</Button>}
            </DialogActions>
        </Dialog>
    </>);
}

export default BookDetail;