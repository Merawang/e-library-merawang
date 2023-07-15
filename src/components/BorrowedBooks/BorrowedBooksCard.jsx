import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

import { BorrowedBooksDetail } from '@/utils/componentsLoader';


const BorrowedBooksCard = ({ borrow }) => {

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<>
        <div className='card mb-12'>
            <BorrowedBooksDetail borrow={borrow} isOpen={isOpen} handleClose={handleClose} />
            <Card>
                <CardMedia
                    component="img"
                    sx={{ minHeight: 100 }}
                    image={borrow?.books.imageUrl}
                    title={borrow?.books.title}
                />
                <CardContent>
                    <h5 className='text-xl font-bold mb-2'>{borrow?.books.title}</h5>
                    <div className="borrowedBy">
                        <p className='text-gray-500'><span className='font-bold ' >Dipinjam oleh: </span>{borrow?.borrowedBy?.name}</p>
                    </div>
                </CardContent>
                <CardActions sx={{ m: 1 }}>
                    <Button variant='contained' color='mainBlue' onClick={handleOpen}>Detail</Button>
                </CardActions>
            </Card>
        </div>
    </>);
}

export default BorrowedBooksCard;