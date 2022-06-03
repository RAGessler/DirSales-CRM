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
import NoteForm from "../../components/NoteForm/NoteForm";
import TaskList from "../../components/TaskList/TaskList";

const ContactPage = () =>{
    const {contactId} = useParams()
    const [user, token] = useAuth();
    const [contactObj, setContactObj] = useState({})
    const [contactInteractions, setContactInteractions]=useState([])
    const [contactNotes, setContactNotes]=useState([])
    const [contactTasks, setContactTasks]=useState([])
    
    const fetchContactDetails = async(contactId)=>{
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

    const fetchContactNotes = async(contactId)=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/notes/contact/${contactId}/`,{
                headers:{
                    Authorization: "Bearer " + token
                },
            });
            setContactNotes(response.data)
        } catch(error){
            console.log(error.response.data)
        }
    }

    const fetchContactTasks = async(contactId)=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/tasks/contact/${contactId}/`,{
                headers:{
                    Authorization: "Bearer " + token
                },
            });
            setContactTasks(response.data)
        }catch(error){
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
        fetchContactDetails(contactId)
        fetchContactInteractions(contactId)
        fetchContactNotes(contactId)
        fetchContactTasks(contactId)
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
                <NoteList notes={contactNotes} />
                <Popup trigger={<button>Add Interaction</button>} modal='true'>
                <NoteForm getContactNotes={fetchContactNotes} contact={contactObj} />
                </Popup>
            </div>
            <div className="tasks">
                <h6>tasks</h6>
                <TaskList tasks={contactTasks} getContactTasks={fetchContactTasks} contact={contactObj} />
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