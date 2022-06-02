import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

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
        <form className="note-form" onSubmit={handleSubmit}>
            <label htmlFor="note">Note:</label>
            <input type="text" name="text" value={formData.text} onChange={handleInputChange} />
            <button type="submit">Create Note</button>
        </form>
    )
}
export default NoteForm