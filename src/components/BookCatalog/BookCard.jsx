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


const BookCard = ({ book }) => {

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<>
        <div className='card mb-6'>
            <BookDetail book={book} isOpen={isOpen} handleClose={handleClose} />
            <Card>
                <CardMedia
                    component="img"
                    sx={{ minHeight: 100 }}
                    image={book?.imageUrl}
                    title={book?.title}
                />
                <div className="status-tags ml-3 mt-3">
                    {book?.isAvailable ?
                        <Chip size='small' icon={<DoneIcon />} color="success" label={`Tersedia (${book?.stock})`} className='shadow' />
                        :
                        <Chip size='small' icon={<BlockIcon />} color="warning" label="Stok buku habis" className='shadow' />
                    }

                </div>
                <CardContent>
                    <h5 className='text-xl font-bold mb-2'>{book?.title}</h5>
                    <div className="category-tags flex flex-row gap-1 mb-2">
                        {book.subjects && book?.subjects.map((subject, i) => {
                            return (<Chip size='small' key={i} label={subject} />)
                        })}
                    </div>
                    <p className='text-base text-gray-500'>{book?.description?.length > 150 ? book?.description.substring(0, 150) + '...' : book?.description}</p>
                </CardContent>
                <CardActions sx={{ m: 1 }}>
                    <Button variant='contained' color='mainBlue' onClick={handleOpen}>Detail</Button>
                </CardActions>
            </Card>
        </div>
    </>);
}

export default BookCard;