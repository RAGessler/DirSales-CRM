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
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ContactForm from '../ContactForm/ContactForm';
import AddIcon from '@mui/icons-material/Add';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IconButton } from '@mui/material';


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
        <div>
            <ContactFilter submitSearch={filterContacts} />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {displayContacts.map((contact, element)=>{
                        return(
                            <tr key={element}>
                                <td>{element+1}</td>
                                <td>{contact.first_name} {contact.last_name}</td>
                                <td>{contact.tag}</td>
                                <td>
                                <Link style={{textDecoration: 'none'}} to={`/details/${contact.id}`} key={user.id}>
                                        <IconButton variant='outlined'>
                                            <OpenInFullIcon/>
                                        </IconButton>
                                    </Link>
                                    <Popup trigger={<IconButton><EditIcon/></IconButton>} modal='true'>
                                        <UpdateContact getUserContacts={props.getUserContacts} contact={contact}/>
                                    </Popup>
                                    <IconButton onClick={()=>deleteContact(contact.id)}><DeleteIcon/></IconButton>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ContactList