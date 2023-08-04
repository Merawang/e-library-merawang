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

import { useBookContext } from "@/hooks/context/useBookContext";
import { useDisplayContext } from '@/hooks/context/useDisplayContext';
import useEdit from '@/hooks/useEdit';

const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const EditBook = ({ isOpen, handleClose, book }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { dispatch } = useBookContext();
    const { isPending, message, setLoading, setMessage } = useDisplayContext();

    // Forms
    const [title, setTitle] = useState(book?.title);
    const [authors, setAuthors] = useState(book?.authors);
    const [publicationDate, setPublicationDate] = useState(book?.publicationDate.split('T')[0]);
    const [publisher, setPublisher] = useState(book?.publisher);
    const [isbn, setIsbn] = useState(book?.isbn);
    const [subjects, setSubjects] = useState(book?.subjects);
    const [ddc, setDdc] = useState(book?.ddc);
    const [pageCount, setPageCount] = useState(book?.pageCount);
    const [description, setDescription] = useState(book?.description);
    const [imageUrl, setImageUrl] = useState(book?.imageUrl);

    const editedBook = { title, authors, publicationDate, publisher, isbn, subjects, ddc, pageCount, description, imageUrl };

    // Handle Edit
    const { handleEdit } = useEdit({ url: baseurl, dispatch, type: 'changed_book', setMessage, setLoading });

    const handleSubmit = (e, id, payload) => {
        handleEdit(e, id, payload)

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
    };

    return (<>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold mb-2">Edit Buku</p>
            </DialogTitle>

            <form action="" method="post">
                <DialogContent>
                    <div className="content-wrapper">
                        <div className="info mb-2">
                            <DialogContentText>Edit buku sesuai dengan data yang ingin diubah</DialogContentText>
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
                    <Button color='mainBlue' disabled={isPending} type='submit' variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit(e, book?._id, editedBook)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Edit'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default EditBook;