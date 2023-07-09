import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SearchIcon from '@mui/icons-material/Search';




const SearchBox = () => {

    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleSort = (event) => {
        setSort(event.target.value);
    }

    return (<>
        <div className="search flex flex-row gap-2 items-start justify-center">
            <TextField
                fullWidth
                label="Cari judul buku"
                placeholder='Contoh: Negeri 5 Menara'
                id="search"
                margin='dense'
                size='small'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <div className="filter">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Filter</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={filter}
                        label="Filter"
                        onChange={handleFilter}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="sort">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={sort}
                        label="Sort"
                        onChange={handleSort}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    </>);
}

export default SearchBox;