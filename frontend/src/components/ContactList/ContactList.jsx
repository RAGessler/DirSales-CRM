import React, {useEffect, useState} from 'react'
import ContactFilter from '../ContactFilter/ContactFilter'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import UpdateContact from '../UpdateContact/UpdateContact';
import { URL_HOST } from "../../urlHost"
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContactForm from '../ContactForm/ContactForm';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ContactList = (props) =>{
    const [displayContacts, setDisplayContacts] = useState(props.userContacts)
    const [user, token] = useAuth();

    useEffect(()=>{
        setDisplayContacts(props.userContacts)
    },[props.userContacts])



    function filterContacts(searchTerm){
        let filteredContacts = props.userContacts.filter((contact)=>{
            if (contact.tag == searchTerm){
            return true;
            }
            else if (searchTerm=="!"){
                return true;
            }
            else{
            return false;
            }})
            setDisplayContacts(filteredContacts)
    }

    async function deleteContact(contactId){
        try{
            let response = await axios.delete(`${URL_HOST}/api/contacts/${contactId}/`,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 204){
                await props.getUserContacts(user.id)
                alert('Success!')
            }
        }
        catch (error){
            console.log(error.message)
            alert(error.message)
        }
    }

    return(
        <TableContainer sx={{maxWidth:'80%', margin:'auto', marginBottom:'5em', border:'2px', borderStyle:'solid', borderRadius:'1em'}}  >
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align='center'>Full Name</TableCell>
                        <TableCell align='center'><ContactFilter submitSearch={filterContacts} /></TableCell>
                        <TableCell align='center'>Options <br />
                                <Popup trigger={<Button sx={{maxWidth: '20em'}}variant="contained" startIcon={<AddIcon/>}>Contact</Button>} modal='true'>
                                    <ContactForm getUserContacts={props.getUserContacts} />
                                </Popup>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayContacts.map((contact, element)=>{
                        return(
                            <TableRow key={element} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{element+1}</TableCell>
                                <TableCell align='center'>{contact.first_name} {contact.last_name}</TableCell>
                                <TableCell align='center'>{contact.tag}</TableCell>
                                <TableCell align='center'>
                                <Link style={{textDecoration: 'none'}} to={`/details/${contact.id}`} key={user.id}>
                                        <IconButton variant='outlined'>
                                            <OpenInFullIcon/>
                                        </IconButton>
                                    </Link>
                                    <Popup trigger={<IconButton><EditIcon/></IconButton>} modal='true'>
                                        <UpdateContact getUserContacts={props.getUserContacts} contact={contact}/>
                                    </Popup>
                                    <IconButton onClick={()=>deleteContact(contact.id)}><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default ContactList