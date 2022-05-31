import React, {useEffect, useState} from 'react'
import Contact from '../Contact/Contact'
import ContactFilter from '../ContactFilter/ContactFilter'

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
            <div>
                <ContactFilter submitSearch={filterContacts} />
            </div>
            {displayContacts && displayContacts.map((contact)=>{
                return(
                    <div key={contact.id}>
                        <Contact first_name={contact.first_name} last_name={contact.last_name}/>
                    </div>
                )
            })}
        </div>
    )
}
export default ContactList