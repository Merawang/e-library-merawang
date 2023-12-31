import { forwardRef, useState } from 'react';

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

import { useBookContext } from "@/hooks/context/useBookContext";
import useAdd from '@/hooks/useAdd';
import { useDisplayContext } from '@/hooks/context/useDisplayContext';

import { AddISBN } from '@/utils/componentsLoader';

const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const AddBook = ({ isOpen, handleClose }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { dispatch } = useBookContext();
    const { isPending, message, setLoading, setMessage } = useDisplayContext();

    // Forms
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [publicationDate, setPublicationDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [ddc, setDdc] = useState('100');
    const [pageCount, setPageCount] = useState(0);
    const [description, setDescription] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const newBook = { title, authors, publicationDate, publisher, isbn, subjects, ddc, pageCount, description, imageUrl };
    const [isISBNOpen, setISBNIsOpen] = useState(false);

    const { handleAdd } = useAdd({ url: baseurl, dispatch, type: 'added_book', setMessage, setLoading });

    const handleSubmit = (e, payload) => {
        handleAdd(e, payload);

        !isPending && handleClose();
    }

    const handleFill = ({ title, authors, publicationDate, publisher, isbn, subjects, ddc, pageCount, description, imageUrl }) => {

        setTitle(title);
        setAuthors(authors);
        setPublicationDate(publicationDate);
        setPublisher(publisher);
        setIsbn(isbn);
        setSubjects(subjects);
        setDdc(ddc);
        setPageCount(pageCount);
        setDescription(description);
        setImageUrl(imageUrl);
    }

    return (<>
        <AddISBN isOpen={isISBNOpen} handleClose={() => setISBNIsOpen(false)} handleFill={handleFill} />
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold mb-2">Tambah Buku</p>
            </DialogTitle>

            <form action="" method="post">
                <DialogContent>
                    <div className="content-wrapper">
                        <div className="info mb-2">
                            <DialogContentText>Tambah buku sesuai dengan input yang diberikan</DialogContentText>
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
                                label="Judul Buku"
                                placeholder='Contoh: Negeri 5 Menara'
                                id="title"
                                margin='dense'
                                size='small'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Autocomplete
                                multiple
                                id="authors"
                                freeSolo
                                limitTags={4}
                                value={authors}
                                onChange={(e, value) => setAuthors((item) => [...value])}
                                options={[]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="filled"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        required
                                        error={message.error}
                                        label="Author"
                                        placeholder="Contoh: Ahmad Fuadi"
                                        id="authors"
                                        margin='dense'
                                        size='small'
                                        helperText={'Tekan enter untuk menambah lebih dari satu author'}
                                    />
                                )}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setPublicationDate(e.target.value)}
                                value={publicationDate}
                                label="Tanggal Publikasi"
                                placeholder='Contoh: 2015-01-13'
                                id="publicationDate"
                                margin='dense'
                                size='small'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setPublisher(e.target.value)}
                                value={publisher}
                                label="Publisher"
                                placeholder='Contoh: Gramedia'
                                id="publisher"
                                margin='dense'
                                size='small'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setIsbn(e.target.value)}
                                value={isbn}
                                label="ISBN"
                                placeholder='Contoh: 9781466889682'
                                id="isbn"
                                margin='dense'
                                size='small'
                                InputLabelProps={{ shrink: true }}
                            />
                            <Autocomplete
                                multiple
                                id="subjects"
                                freeSolo
                                limitTags={4}
                                value={subjects}
                                onChange={(e, value) => setSubjects((item) => [...value])}
                                options={[]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="filled"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        required
                                        error={message.error}
                                        label="Kategori"
                                        placeholder="Contoh: horror"
                                        id="subjects"
                                        margin='dense'
                                        size='small'
                                        helperText={'Tekan enter untuk menambah lebih dari satu kategori'}
                                    />
                                )}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setDdc(e.target.value)}
                                value={ddc}
                                label="Dewey Decimal Classification (DDC)"
                                placeholder='Contoh: 199.75'
                                id="ddc"
                                margin='dense'
                                size='small'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                required
                                error={message.error}
                                onChange={(e) => setPageCount(e.target.value)}
                                value={pageCount}
                                label="Jumlah Halaman"
                                placeholder='Contoh: 112'
                                id="pageCount"
                                margin='dense'
                                size='small'
                                type='number'
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                multiline
                                label="Deskripsi"
                                placeholder='Contoh: "As a bestselling author and our nation`s earliest spokesman, Benjamin Franklin brilliantly extolled virtues of temperance, industry...'
                                id="description"
                                margin='dense'
                                size='small'
                                InputLabelProps={{ shrink: true }}
                            />
                            {/* <TextField
                                fullWidth
                                onChange={handleChange}
                                label="Gambar Cover"
                                placeholder='Contoh: "As a bestselling author and our nation`s earliest spokesman, Benjamin Franklin brilliantly extolled virtues of temperance, industry...'
                                id="imageUrl"
                                margin='dense'
                                size='small'
                                type='file'
                                InputLabelProps={{ shrink: true }}
                            /> */}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color='mainBlue' variant='text' sx={{ m: 1 }} onClick={handleClose}>Tutup</Button>
                    <Button color='mainBlue' variant='text' sx={{ m: 1 }} onClick={() => handleFill({
                        title: '',
                        authors: [],
                        publicationDate: '12-12-2020',
                        publisher: '',
                        isbn: '',
                        subjects: [],
                        ddc: '',
                        pageCount: 0,
                        description: '',
                        imageUrl: 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg'
                    })}>Clear</Button>
                    <Button color='mainBlue' endIcon={<QrCode2Icon color='' size='small' />} variant='outlined' sx={{ m: 1 }} onClick={() => setISBNIsOpen(true)}>Cari Buku</Button>
                    <Button color='mainBlue' disabled={isPending} type='submit' variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit(e, newBook)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Tambah'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default AddBook;