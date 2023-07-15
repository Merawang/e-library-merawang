import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

import SearchIcon from '@mui/icons-material/Search';




const SearchBox = () => {

    const filter = [
        {
            title: 'Horror',
            value: 'horror'
        },
        {
            title: 'References',
            value: 'references'
        },
    ]

    const sort = [
        {
            title: 'Nama (A-Z)',
            value: 'nameAsc'
        },
        {
            title: 'Nama (Z-A)',
            value: 'nameDesc'
        },
    ]

    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const handleFilter = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleSort = (event) => {
        setSelectedSort(event.target.value);
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
                        value={selectedFilter}
                        label="Filter"
                        onChange={handleFilter}
                    >
                        <ListSubheader>Category</ListSubheader>
                        {!!filter.length && filter.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                            )
                        })}
                        <ListSubheader>Publisher</ListSubheader>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="sort">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedSort}
                        label="Sort"
                        onChange={handleSort}
                    >
                        {!!sort.length && sort.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    </>);
}

export default SearchBox;