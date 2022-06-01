import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost"
import InteractionList from "../../components/InteractionList/InteractionList";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
import InteractionForm from "../../components/InteractionForm/InteractionForm";
import NoteList from "../../components/NoteList/NoteList";

const ContactPage = () =>{
    const {contactId} = useParams()
    const [user, token] = useAuth();
    const [contactObj, setContactObj] = useState({})
    const [contactInteractions, setContactInteractions]=useState([])
    
    const fetchContactDetails = async()=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/contacts/${contactId}/`,{
                headers: {
                    Authorization: "Bearer " + token
                },
            });
            setContactObj(response.data)
        } catch (error){
            console.log(error.response.data)
        }
    }

    const fetchContactInteractions = async(contactId)=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/interactions/contact/${contactId}/`,{
                headers:{
                    Authorization: "Bearer " + token
                },
            });
            setContactInteractions(response.data)
        } catch(error){
            console.log(error.response.data)
        }
    }
    
    useEffect(()=>{
        fetchContactDetails()
        fetchContactInteractions(contactId)
    },[])
    return(
        <div>
            <ul>
                <li>Name: {contactObj.first_name} {contactObj.last_name}</li>
                <li>Phone Number: {contactObj.phone_number}</li>
                <li>Twitter: {contactObj.twitter_handle}</li>
                <li>Instagram: {contactObj.instagram_handle}</li>
                <li>Other Social Media: {contactObj.other_handle}</li>
                <li>Type: {contactObj.tag}</li>
            </ul>
            <div className="interactions">
                <InteractionList interactions={contactInteractions} />
                <Popup trigger={<button>Add Interaction</button>} modal='true'>
                <InteractionForm getContactInteractions={fetchContactInteractions} contact={contactObj} />
                </Popup>
            </div>
            <div className="notes">
                {/* <NoteList contactId={contactId} /> */}
            </div>
        </div>
    )
}
export default ContactPage

//detailed list for contact details
{/* <dl>
    <dt>Name</dt>
    <dd>{contactObj.first_name} {contactObj.last_name}</dd>
    <dt>Phone Number</dt>
    <dd>{contactObj.phone_number}</dd>
    <dt>Twitter</dt>
    <dd>{contactObj.twitter_handle}</dd>
    <dt>Instagram</dt>
    <dd>{contactObj.instagram_handle}</dd>
    <dt>Other Social Media</dt>
    <dd>{contactObj.other_handle}</dd>
</dl> */}