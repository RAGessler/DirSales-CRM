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


const ContactList = (props) =>{
    const [displayContacts, setDisplayContacts] = useState(props.userContacts)
    const [user, token] = useAuth();

    useEffect(()=>{
        setDisplayContacts(props.userContacts)
    },[props.userContacts])



    function filterContacts(searchTerm){
        let filteredContacts = props.userContacts.filter((contact)=>{
            if (contact.tag === searchTerm ||
                searchTerm==='a'){
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
                                <td><Link to={`/details/${contact.id}`} key={user.id}>{contact.first_name} {contact.last_name}</Link></td>
                                <td>{contact.tag}</td>
                                <td>
                                    <Popup trigger={<Button variant="outlined" startIcon={<EditIcon/>}>Edit</Button>} modal='true'>
                                        <UpdateContact getUserContacts={props.getUserContacts} contact={contact}/>
                                    </Popup>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>deleteContact(contact.id)}>Delete</Button>
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