import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

import { BookDetail } from '@/utils/componentsLoader';


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
            {/* <BookDetail book={book} isOpen={isOpen} handleClose={handleClose} /> */}
            <Card>
                <CardMedia
                    component="img"
                    sx={{ minHeight: 100 }}
                    image={borrow?.books.imageUrl}
                    title={borrow?.books.title}
                />
                <CardContent>
                    <h5 className='text-xl font-bold mb-2'>{borrow?.books.title}</h5>
                    <div className="category-tags flex flex-row gap-1 mb-2">
                        {borrow?.books.subjects && borrow?.books.subjects.map((subject, i) => {
                            return (<Chip size='small' key={i} label={subject} />)
                        })}
                    </div>
                    <p className='text-base text-gray-500'>{borrow?.books.description.length > 150 && borrow?.books.description.substring(0, 150) + '...'}</p>
                </CardContent>
                <CardActions sx={{ m: 1 }}>
                    <Button variant='contained' color='mainBlue' onClick={handleOpen}>Detail</Button>
                </CardActions>
            </Card>
        </div>
    </>);
}

export default BorrowedBooksCard;