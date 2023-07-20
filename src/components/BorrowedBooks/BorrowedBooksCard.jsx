import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const BorrowedBooksCard = ({ borrow, isOpen, handleOpen, handleClose }) => {

    return (<>

        <div className='card mb-12'>
            <Card>
                <CardMedia
                    component="img"
                    sx={{ minHeight: 100 }}
                    image={borrow?.books.imageUrl}
                    title={borrow?.books.title}
                />
                <CardContent>
                    <p className='text-xl font-bold mb-2'>{borrow?.books.title}</p>
                    <div className="borrowedBy">
                        <p className='text-gray-500'><span className='font-bold ' >Dipinjam oleh: </span>{borrow?.borrowedBy?.name}</p>
                    </div>
                </CardContent>
                <CardActions sx={{ m: 1 }}>
                    <Button variant='contained' color='mainBlue' onClick={() => handleOpen(borrow)}>Detail</Button>
                </CardActions>
            </Card>
        </div>
    </>);
}

export default BorrowedBooksCard;