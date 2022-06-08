import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const InteractionFilter = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        props.submitSearch(event.target.value)
      };

    return(
        <Box>
            <FormControl sx={{width:'10em'}}>
                <InputLabel id='tag-filter'>Type</InputLabel>
                <Select  labelId='filter-by' id='tag-filter-select' label='Type' value={searchTerm} onChange={handleChange}>
                    <MenuItem value={"Phone Call"}>Phone Call</MenuItem>
                    <MenuItem value={"Video"}>Video</MenuItem>
                    <MenuItem value={"Text/DM"}>Text/DM</MenuItem>
                    <MenuItem value={"F2F"}>F2F</MenuItem>
                    <MenuItem value={"!"}>No Filter</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default InteractionFilter