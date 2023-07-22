import { forwardRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { useDisplayContext } from '@/hooks/context/useDisplayContext';
import useISBN from '@/hooks/useISBN';

const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const AddISBN = ({ isOpen, handleClose, handleFill }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { isPending, message, setLoading, setMessage } = useDisplayContext();

    const [isbn, setISBN] = useState({});
    const [data, setData] = useState();

    const handleAdd = ({ title, authors, publicationDate, publisher, isbn, subjects, ddc, pageCount, description, imageUrl }) => {
        handleFill({
            title,
            authors,
            publicationDate,
            publisher,
            isbn,
            subjects,
            ddc,
            pageCount,
            description,
            imageUrl
        })
        handleClose();
    }

    const handleChange = (e) => {
        setISBN(e.target.value);
    }

    const handleSubmit = (e, payload) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!Object.keys(payload).length) {
            useISBN({ url: baseurl, isbn: payload, setData, setLoading, setMessage });
        }
    }

    return (<>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold">Cari Buku berdasarkan ISBN</p>
            </DialogTitle>

            <form action="" method="post">
                <DialogContent>
                    <div className="content-wrapper">
                        <div className="info mb-2">
                            <DialogContentText>Input ISBN dari buku yang ingin ditambahkan</DialogContentText>
                        </div>
                        <div className="input mb-2">
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
                                label="ISBN"
                                placeholder='Contoh: 9781466889682'
                                id="isbn"
                                margin='dense'
                                size='small'
                            />
                        </div>
                        <div className="message">
                            {message.error &&
                                <Alert variant="filled" className="mb-5" severity={message.severity}>
                                    {message.message}
                                </Alert>
                            }
                        </div>
                        <div className="found-books overflow-y-auto h-[30vh]">
                            {data?.totalItems === 0 ? `Tidak ada buku dengan ISBN ${isbn}` :
                                data?.items?.map((item) => {
                                    return (
                                        <div key={item?.id} className="book-wrapper flex flex-row justify-between w-full items-center">
                                            <p className='mr-6'>{item?.volumeInfo?.title}</p>
                                            <Button
                                                color='mainBlue'
                                                size='small'
                                                variant='outlined'
                                                sx={{ my: 1 }}
                                                onClick={() => {handleAdd(
                                                    {
                                                        title: item?.volumeInfo?.title || 'Untitled',
                                                        authors: item?.volumeInfo?.authors || ['-'],
                                                        publicationDate: item?.volumeInfo?.publishedDate.match(/^\d{4}-\d{2}-\d{2}$/) ? item?.volumeInfo?.publishedDate : `${item?.volumeInfo?.publishedDate}-01-01`,
                                                        publisher: item?.volumeInfo?.publisher || '-',
                                                        isbn: item?.volumeInfo?.industryIdentifiers[0]?.identifier || isbn,
                                                        subjects: item?.volumeInfo?.categories || ['-'],
                                                        ddc: '-',
                                                        pageCount: item?.volumeInfo?.pageCount || 0,
                                                        description: item?.volumeInfo?.description || '-',
                                                        imageUrl: item?.volumeInfo?.imageLinks?.thumbnail || 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg', 
                                                    }
                                                )}}>
                                                Tambah
                                            </Button>
                                        </div>

                                    )
                                })
                            }

                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color='mainBlue' variant='text' sx={{ m: 1 }} onClick={handleClose}>Tutup</Button>
                    <Button color='mainBlue' disabled={isPending} type='submit' variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit(e, isbn)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Cari'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default AddISBN;