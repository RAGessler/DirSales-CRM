import React, {useState} from 'react'
import Contact from '../Contact/Contact'

const ContactList = (props) =>{
    
    return(
        <div>
            {props.userContacts && props.userContacts.map((contact)=>{
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