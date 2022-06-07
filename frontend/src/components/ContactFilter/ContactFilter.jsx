import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ContactFilter = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    function handleSearch(event){
        event.preventDefault();
        let newSearchTerm = searchTerm
        console.log(newSearchTerm)
        props.submitSearch(newSearchTerm)
    }

    return(
        <div>
            <h5>Filter</h5>
            <FormControl fullWidth onSubmit={handleSearch}>
                <label htmlFor="filter-by">Filter By:</label>
                <Select type="text" name='filter-by' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}>
                    <MenuItem value="Potential Client">Potential Client</MenuItem>
                    <MenuItem value="Potential Partnetr">Potential Partner</MenuItem>
                    <MenuItem value="Client">Client</MenuItem>
                    <MenuItem value='a'>No Filter</MenuItem>
                </Select>
                <Button variant='contained' startIcon={<SearchIcon/>} type='submit'>Search</Button>
            </FormControl>
        </div>
    )
}
export default ContactFilter