import React, {useEffect, useState} from 'react'
import ContactFilter from '../ContactFilter/ContactFilter'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ContactForm from '../ContactForm/ContactForm';
import UpdateContact from '../UpdateContact/UpdateContact';


const ContactList = (props) =>{
    const [displayContacts, setDisplayContacts] = useState(props.userContacts)

    useEffect(()=>{
        setDisplayContacts(props.userContacts)
    },[props.userContacts])

    function filterContacts(searchTerm){
        let filteredContacts = props.userContacts.filter((contact)=>{
            if (contact.tag === searchTerm){
            return true;
            }
            else{
            return false;
            }})
            setDisplayContacts(filteredContacts)
        }
    
    return(
        <div>
            <ContactFilter submitSearch={filterContacts} />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Twitter</th>
                        <th>Instagram</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {displayContacts.map((contact, element)=>{
                        return(
                            <tr key={element}>
                                <td>{element+1}</td>
                                <td> {contact.first_name} {contact.last_name}</td>
                                <td>{contact.phone_number}</td>
                                <td>{contact.twitter_handle}</td>
                                <td>{contact.instagram_handle}</td>
                                <td>{contact.tag}</td>
                                <td>
                                    <Popup trigger={<button>Edit</button>} modal='true'>
                                        <UpdateContact getUserContacts={props.getUserContacts} contact={contact}/>
                                    </Popup>
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