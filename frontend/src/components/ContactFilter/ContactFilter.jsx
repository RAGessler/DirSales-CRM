import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ContactFilter = (props) => {
    const [searchTerm, setSearchTerm] = useState('!')

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        props.submitSearch(event.target.value)
      };

    return(
        <Box>
            <FormControl>
                <InputLabel id='tag-filter'>Tag</InputLabel>
                <Select labelId='filter-by' id='tag-filter-select' label='tag' value={searchTerm} onChange={handleChange}>
                    <MenuItem value={"Potential Client"}>Potential Client</MenuItem>
                    <MenuItem value={"Potential Partner"}>Potential Partner</MenuItem>
                    <MenuItem value={"Client"}>Client</MenuItem>
                    <MenuItem value={"!"}>No Filter</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default ContactFilter