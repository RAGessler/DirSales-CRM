import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';

const InteractionFilterDate = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        props.submitSearch(event.target.value)
      };

    return(
        <Box>
            <FormControl sx={{width:'10em'}}>
                <TextField
                value={searchTerm}
                onChange={handleChange}
                id='date'
                type="date"
                label='Date'
                InputLabelProps={{
                    shrink: true,
                  }}
                />
            </FormControl>
        </Box>
    )
}
export default InteractionFilterDate