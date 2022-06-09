import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';
let initialValues={
    user:"",
    type:"",
    contact:"",
    date:"",
    time:"",
    notes:""
}

const InteractionForm = (props)=>{
    const [user, token]=useAuth();
    const [formData, handleInputChange, handleSubmit, reset]=useCustomForm(
        initialValues,
        postNewInteraction
    );


    async function postNewInteraction(){
        try{
            let response = await axios.post(`${URL_HOST}/api/interactions/contact/${props.contact.id}/`, formData,{
                headers:{
                    Authorization: 'Bearer '+token
                }
            })
            if (response.status===201){
                await props.getContactInteractions(props.contact.id)
                alert('Success!')
            }
        }catch(error){
            console.log(error.message)
            alert('Error, see logs')
        }
    }
    return(
        <form style={{padding:'1em', borderStyle:'inset'}} className="form" onSubmit={handleSubmit}>
            <select style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}} name="type" id="type" onChange={handleInputChange} value={formData.type}>
                <option>Select Type</option>
                <option value={"Phone Call"}>Phone Call</option>
                <option value={"Text/DM"}>Text/DM</option>
                <option value={"Video"}>Video</option>
                <option value={"F2F"}>F2F</option>
            </select>
            <label>Date</label>
            <input style={{maxWidth:'20%', borderColor:'black', borderRadius:'1em'}} type="date" name="date" value={formData.date} onChange={handleInputChange}/>
            <label>Time</label>
            <input style={{maxWidth:'20%', borderColor:'black', borderRadius:'1em'}} type="time" name="time" value={formData.time} onChange={handleInputChange} />
            <label>Notes</label>
            <input style={{maxWidth:'50%', borderColor:'black', borderRadius:'1em'}} type="text" name="notes" value={formData.notes} onChange={handleInputChange} />
            <Button type="submit">Create</Button>
        </form>
    )
}
export default InteractionForm