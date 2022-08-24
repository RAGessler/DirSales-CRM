import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

let initialValues = {
    user: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    twitter_handle: "",
    instagram_handle: "",
    other_handle: "",
    tag: ""
}

const ContactForm = (props) =>{
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        postNewContact
    );
    const [open, setOpen] = useState(false);
    const handleClickOpen = () =>{
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    async function postNewContact(){
        try{
            let response = await axios.post(`${URL_HOST}/api/contacts/`, formData,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 201){
                await props.getUserContacts(user.id)
                alert('Contact Created!')
                setOpen(false)
            }
        }
        catch (error){
            console.log(error.message)
            alert('error')
        }
    }

    return (
<Box>

            <Button variant ="outlined" onClick={handleClickOpen}>
                Add Contact
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Contact Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="tag-select">Category</InputLabel>
                        <Select
                        labelId="tag-select"
                        id="tag"
                        Value={formData.tag}
                        label="Category"
                        onChange={handleInputChange}
                        >
                            <MenuItem value={"Client"}>Client</MenuItem>
                            <MenuItem value={"Potential Client"}>Potantial Client</MenuItem>
                            <MenuItem value={"Potential Partner"}>Potential Partner</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="first_name"
                    defaultValue={formData.first_name}
                    label="First Name"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                   
                    <TextField
                    margin="dense"
                    id="last_name"
                    defaultValue={formData.last_name}
                    label="Last Name"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                    
                    <TextField
                    margin="dense"
                    id="phone_number"
                    defaultValue={formData.phone_number}
                    label="Phone Number"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                    
                    <TextField
                    margin="dense"
                    id="twitter_handle"
                    defaultValue={formData.twitter_handle}
                    label="Twitter Handle"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                    
                    <TextField
                    margin="dense"
                    id="instagram_handle"
                    defaultValue={formData.instagram_handle}
                    label="Instagram Handle"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                    
                    <TextField
                    margin="dense"
                    id="other_handle"
                    defaultValue={formData.other_handle}
                    label="Other Social Media"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit Information</Button>
                </DialogActions>
            </Dialog>
</Box>
    )
}
export default ContactForm;