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
import TaskForm from "../../components/TaskForm/TaskForm";
import DateForm from "../../components/DateForm/DateForm";
import DateList from "../../components/DateList/DateList";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublicIcon from '@mui/icons-material/Public';
import TagIcon from '@mui/icons-material/Tag';

const ContactPage = () =>{
    const {contactId} = useParams()
    const [user, token] = useAuth();
    const [contactObj, setContactObj] = useState({})
    const [contactInteractions, setContactInteractions]=useState([])
    const [contactNotes, setContactNotes]=useState([])
    const [contactTasks, setContactTasks]=useState([])
    const [contactDates, setContactDates]=useState([])
    
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
    
    const fetchContactDates = async(contactId)=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/dates/contact/${contactId}/`,{
                headers:{
                    Authorization: "Bearer " + token
                },
            });
            setContactDates(response.data)
        } catch(error){
            console.log(error.response.data)
        }
    }

    
    useEffect(()=>{
        fetchContactDetails(contactId)
        fetchContactInteractions(contactId)
        fetchContactNotes(contactId)
        fetchContactTasks(contactId)
        fetchContactDates(contactId)
    },[])
    return(
        <Box>
            <Box sx={{margin:'2em', }}>
            <center><h2 style={{padding:'1em'}}>{contactObj.first_name} {contactObj.last_name}</h2></center>
            <ul>
                <li style={{display:'inline'}}> <PhoneIcon/> {contactObj.phone_number}</li>
                <li><TwitterIcon/> {contactObj.twitter_handle}</li>
                <li><InstagramIcon/> {contactObj.instagram_handle}</li>
                <li><PublicIcon/> {contactObj.other_handle}</li>
                <li><TagIcon/> {contactObj.tag}</li>
            </ul>
            </Box>
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Box sx={{width:"25%", border:'2px', borderColor:'black', borderStyle:'solid', borderRadius:'1em', padding:'1em', marginX:'3em'}}>
                    <h3>Interactions</h3>
                    <InteractionList interactions={contactInteractions} />
                    <Popup trigger={<Button sx={{width:'100%', marginX:'', paddingX:'50%' }} variant="contained" startIcon={<AddIcon/>}>Interaction</Button>} modal='true'>
                    <InteractionForm getContactInteractions={fetchContactInteractions} contact={contactObj} />
                    </Popup>
                </Box>
                <Box name='Tasks' sx={{width:"25%", border:'2px', borderColor:'black', borderStyle:'solid', borderRadius:'1em', padding:'1em', marginX:'3em'}}>
                    <h3>Tasks</h3>
                    <TaskList tasks={contactTasks} getContactTasks={fetchContactTasks} contact={contactObj} />
                    <Popup trigger={<Button sx={{width:'100%', marginX:'', paddingX:'50%' }} variant="contained" startIcon={<AddIcon/>}>Task</Button>} modal='true'>
                    <TaskForm getContactTasks={fetchContactTasks} contact={contactObj} />
                    </Popup>
                </Box>
                <Box sx={{width:"25%", border:'2px', borderColor:'black', borderStyle:'solid', borderRadius:'1em', padding:'1em', marginX:'3em'}}>
                    <h3>Schedule</h3>
                    <DateList dates={contactDates} getContactDates={fetchContactDates} contact={contactObj}/>
                    <Popup trigger={<Button sx={{width:'100%', marginX:'', paddingX:'50%' }} variant="contained" startIcon={<AddIcon/>}>Event</Button>} modal='true'>
                        <DateForm contact={contactObj} getContactDates={fetchContactDates}/>
                    </Popup>
                </Box>
            </Box>
            <Box sx={{maxWidth:"80%", border:'2px', borderColor:'black',  borderRadius:'1em', padding:'1em', marginX:'auto', marginBottom:'5em', marginTop:'2em'}}>
                <NoteList notes={contactNotes} />
                <Popup trigger={<Button sx={{width:'100%', marginX:'', paddingX:'50%' }} variant="contained" startIcon={<AddIcon/>}>Note</Button>} modal='true'>
                <NoteForm getContactNotes={fetchContactNotes} contact={contactObj} />
                </Popup>
            </Box>
        </Box>
    )
}
export default ContactPage
