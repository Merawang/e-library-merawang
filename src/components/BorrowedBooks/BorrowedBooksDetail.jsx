import { forwardRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Grow from '@mui/material/Grow';
import Chip from '@mui/material/Chip';

import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';


const Transition = forwardRef(function Transition(props, ref) {
    // return <Slide direction="up" ref={ref} {...props} />;
    return <Grow ref={ref} {...props} />
});

const BorrowedBooksDetail = ({ borrow, isOpen, handleClose }) => {

    const isLoggedIn = () => {
        return true
    }

    return (<>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                <p className="font-bold mb-2">{borrow?.books?.title}</p>
                <div className="category-tags flex flex-row gap-1 mb-2">
                    {borrow.books?.subjects && borrow?.books?.subjects.map((subject, i) => {
                        return (<Chip size='small' label={subject} key={i} />)
                    })}
                </div>
            </DialogTitle>

            <DialogContent>
                <div className="wrapper flex flex-row gap-4">
                    <div className="image basis-1/3 w-96">
                        <img src={borrow?.books?.imageUrl} alt={borrow?.books?.title} loading='lazy' className='w-full' />
                        <div className="flex flex-row gap-2 mt-2 status-tags absolute">
                            <p>Status: </p>
                            {borrow?.books?.isAvailable ?
                                <Chip size='small' icon={<DoneIcon />} color="success" label={`Tersedia (${book?.stock})`} className='shadow' />
                                :
                                <Chip size='small' icon={<BlockIcon />} color="warning" label="Stok habis" className='shadow' />
                            }

                        </div>
                    </div>
                    <div className="content-right basis-2/3 h-full text-base overflow-y-auto">
                        <div className="borrow-info mb-5">
                            <p id="publisher"><span className='font-bold'>Publisher:</span> {borrow?.books?.publisher}</p>
                            <p id="publicationDate"><span className='font-bold'>Tanggal Publikasi:</span> {borrow?.books?.publicationDate}</p>
                            <p id="isbn"><span className='font-bold'>ISBN:</span> {borrow?.books?.isbn}</p>
                            <p id="ddc"><span className='font-bold'>DDC:</span> {borrow?.books?.ddc}</p>
                            <p id="lcc"><span className='font-bold'>LCC:</span> {borrow?.books?.lcc}</p>
                            <p id="pageCount"><span className='font-bold'>Jumlah Halaman:</span> {borrow?.books?.pageCount}</p>
                        </div>
                        <div className="book-info mb-5">
                            <h4 className="font-bold text-xl mb-3">Informasi Peminjaman:</h4>
                            <p id="name"><span className='font-bold'>Dipinjam oleh:</span> {borrow?.borrowedBy?.name || '-'}</p>
                            <p id="address"><span className='font-bold'>Alamat Peminjam:</span> {borrow?.borrowedBy?.address || '-'}</p>
                            <p id="phoneNumber"><span className='font-bold'>No. HP:</span> {borrow?.borrowedBy?.phoneNumber || '-'}</p>
                            <p id="borrowedDate"><span className='font-bold'>Tanggal Peminjaman:</span> {borrow?.borrowedDate?.split('T')[0] || '-'}</p>
                            <p id="dueDate"><span className='font-bold'>Jatuh Tempo Peminjaman:</span> {borrow?.dueDate?.split('T')[0] || '-'}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='mainBlue' variant='text' sx={{ m: 1 }} onClick={handleClose}>Tutup</Button>
                <Button color='mainBlue' variant='contained' sx={{ m: 1 }} onClick={handleClose}>Kembalikan Buku</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default BorrowedBooksDetail;