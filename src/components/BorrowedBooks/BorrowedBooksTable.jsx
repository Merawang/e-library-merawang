import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const BorrowedBooksTable = ({ borrows, isOpen, handleOpen, handleClose, setBorrowDetail }) => {

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
                    {borrows.map((borrow) => (
                        <TableRow
                            key={borrow?._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="borrow">
                                {borrow?.books?.title || '~Buku sudah dihapus~'}
                            </TableCell>
                            <TableCell align="left">{borrow?.borrowedBy?.name}</TableCell>
                            <TableCell align="left">{borrow?.borrowedBy?.address}</TableCell>
                            <TableCell align="left">{borrow?.borrowedBy?.phoneNumber}</TableCell>
                            <TableCell align="left">{borrow?.borrowedDate.split('T')[0]}</TableCell>
                            <TableCell align="left">{borrow?.dueDate.split('T')[0]}</TableCell>
                            <TableCell align="left"><Button variant='contained' color='mainBlue' onClick={() => handleOpen(borrow)}>Detail</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}

export default BorrowedBooksTable;