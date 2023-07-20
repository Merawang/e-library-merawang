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

import QrCode2Icon from '@mui/icons-material/QrCode2';

import { useBookContext } from "@/hooks/context/useBookContext";
import useAdd from '@/hooks/useAdd';
import { useDisplayContext } from '@/hooks/context/useDisplayContext';

const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const AddBook = ({ isOpen, handleClose }) => {

    const baseurl = `${import.meta.env.VITE_BACKEND_BASEURL}/api/books`;
    const { dispatch } = useBookContext();
    const { setLoading, setMessage } = useDisplayContext();

    const [newBook, setNewBook] = useState({});

    const { handleAdd } = useAdd({ url: baseurl, dispatch, type: 'added_book', setMessage, setLoading });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewBook((item) => { return { ...item, [id]: value } });
    }

    const handleSubmit = (e, payload) => {
        handleAdd(e, payload);
        handleClose();
    }

    return (<>
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
                        <div className="input">
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
                                label="Judul Buku"
                                placeholder='Contoh: Negeri 5 Menara'
                                id="title"
                                margin='dense'
                                size='small'
                            />
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
                                label="Author"
                                placeholder='Contoh: Ahmad Fuadi'
                                id="author"
                                margin='dense'
                                size='small'
                            />
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
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
                                onChange={handleChange}
                                label="Publisher"
                                placeholder='Contoh: Gramedia'
                                id="publisher"
                                margin='dense'
                                size='small'
                            />
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
                                label="ISBN"
                                placeholder='Contoh: 9781466889682'
                                id="isbn"
                                margin='dense'
                                size='small'
                                type='number'
                            />
                            <Autocomplete
                                multiple
                                id="subjects"
                                freeSolo
                                limitTags={4}
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
                                        onChange={handleChange}
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
                                onChange={handleChange}
                                label="Dewey Decimal Classification (DDC)"
                                placeholder='Contoh: 199.75'
                                id="ddc"
                                margin='dense'
                                size='small'
                            />
                            <TextField
                                fullWidth
                                required
                                onChange={handleChange}
                                label="Jumlah Halaman"
                                placeholder='Contoh: 112'
                                id="pageCount"
                                margin='dense'
                                size='small'
                                type='number'
                            />
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                multiline
                                label="Deskripsi"
                                placeholder='Contoh: "As a bestselling author and our nation`s earliest spokesman, Benjamin Franklin brilliantly extolled virtues of temperance, industry...'
                                id="description"
                                margin='dense'
                                size='small'
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
                    <Button color='mainBlue' endIcon={<QrCode2Icon color='' size='small' />} variant='outlined' sx={{ m: 1 }}>Scan ISBN</Button>
                    <Button color='mainBlue' type='submit' variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit(e, newBook)}>Tambah Buku</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>);
}

export default AddBook;