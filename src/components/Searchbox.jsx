import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ placeholder, searchText, setSearchText, selectedSort, selectedFilter, setSelectedFilter, setSelectedSort, filter }) => {

    const filterList = [
        {
            title: 'Horror',
            value: 'horror'
        },
        {
            title: 'References',
            value: 'references'
        },
    ]

    const sortList = [
        {
            title: 'Nama (A-Z)',
            value: 'nameAsc'
        },
        {
            title: 'Nama (Z-A)',
            value: 'nameDesc'
        },
    ]

    const handleFilter = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleSort = (event) => {
        const value = event?.target?.value;
        setSelectedSort(value);
        filter(searchText, selectedSort);
    }

    const handleInputChange = (event) => {
        const value = event?.target?.value;
        setSearchText(value);
        filter(searchText, selectedSort);
    }


    return (<>
        <div className="search flex flex-row gap-2 items-start justify-center">
            <TextField
                fullWidth
                onChange={handleInputChange}
                label="Cari judul buku"
                placeholder={placeholder}
                id="search"
                margin='dense'
                size='small'
                value={searchText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            {/* <div className="filter">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Filter</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedFilter}
                        label="Filter"
                        onChange={(e) => handleFilter(e)}
                    >
                        <ListSubheader>Category</ListSubheader>
                        {!!filterList.length && filterList.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div> */}
            <div className="sort">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedSort}
                        label="Sort"
                        onChange={(e) => handleSort(e)}
                    >
                        {!!sortList.length && sortList.map((item, i) => {
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