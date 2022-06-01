import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

let initialValues={
    user:"",
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
        <form className="interactionForm" onSubmit={handleSubmit}>
            <label>Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleInputChange}/>
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange}/>
            <label>Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
            <label>Notes</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleInputChange} />
            <button type="submit">Create</button>
        </form>
    )
}
export default InteractionForm