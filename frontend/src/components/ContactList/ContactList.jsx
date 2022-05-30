import React, {useState} from 'react'
import Contact from '../Contact/Contact'

const ContactList = (props) =>{
    
    useState(()=>{
        props.getUserContacts()
    })
}
export default ContactList