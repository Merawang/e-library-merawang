import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import DoneIcon from '@mui/icons-material/Done';


const BookCard = () => {
    return (<>
        <Card>
            <div className="status-tags absolute m-2">
                <Chip size='small' icon={<DoneIcon />} color="success" label="Available" />
            </div>
            <CardMedia
                component="img"
                sx={{ minHeight: 100 }}
                image="http://books.google.com/books/content?id=40zABQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                title="books"
            />
            <CardContent>
                <h5 className='text-xl font-bold'>Linear Algebra 8th Ed.</h5>
                <p className='text-base text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id voluptatem ad fuga earum sequi debitis quis, impedit asperiores rem illum.</p>
            </CardContent>
            <CardActions sx={{ m: 1 }}>
                <Button size="small" variant='contained'>More..</Button>
            </CardActions>
        </Card>
    </>);
}

export default BookCard;