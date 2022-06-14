import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';
let initialValues={
    text:"",
}

const NoteForm = (props)=>{
    const [user, token]= useAuth();
    const [formData, handleInputChange, handleSubmit]=useCustomForm(
        initialValues,
        postNewNote
    );

    async function postNewNote(){
        try{
            let response = await axios.post(`${URL_HOST}/api/notes/contact/${props.contact.id}/`, formData,{
                headers:{
                    Authorization: 'Bearer '+token
                }
            })
            if (response.status===201){
                await props.getContactNotes(props.contact.id)
                alert('Success!')
            }
        }catch(error){
            console.log(error.message)
            alert(`Error: See Notes`)
        }
    }
    return(
        <form className="form" style={{padding:'1em', borderStyle:'inset'}} onSubmit={handleSubmit}>
            <label htmlFor="note">Note:</label>
            <input style={{maxWidth:'60%', borderColor:'black', borderRadius:'1em'}} type="text" name="text" value={formData.text} onChange={handleInputChange} />
            <Button type="submit">Create Note</Button>
        </form>
    )
}
export default NoteForm