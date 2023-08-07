import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

import { useDisplayContext } from '@/hooks/context/useDisplayContext';


const BorrowedBooksTable = ({ borrows, isOpen, handleOpen, handleClose, setBorrowDetail }) => {

    const { isPending } = useDisplayContext();

    return (<>
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Buku</TableCell>
                        <TableCell align="left">Peminjam</TableCell>
                        <TableCell align="left">Alamat</TableCell>
                        <TableCell align="left">No. HP</TableCell>
                        <TableCell align="left">Tanggal Peminjaman</TableCell>
                        <TableCell align="left">Jatuh Tempo</TableCell>
                        <TableCell align="left">Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {borrows?.map((borrow) => (
                        <TableRow
                            key={borrow?._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="borrow">
                                {isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.books?.title || '~Buku sudah dihapus~'}
                            </TableCell>
                            <TableCell align="left">{isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.borrowedBy?.name}</TableCell>
                            <TableCell align="left">{isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.borrowedBy?.address}</TableCell>
                            <TableCell align="left">{isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.borrowedBy?.phoneNumber}</TableCell>
                            <TableCell align="left">{isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.borrowedDate.split('T')[0]}</TableCell>
                            <TableCell align="left">{isPending ? <Skeleton variant="rounded" className='w-full' height={10} /> : borrow?.dueDate.split('T')[0]}</TableCell>
                            <TableCell align="left"><Button disabled={isPending} variant='contained' color='mainBlue' onClick={() => handleOpen(borrow)}>{isPending ? <CircularProgress color='inherit' size={20} /> : 'Detail'}</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}

export default BorrowedBooksTable;