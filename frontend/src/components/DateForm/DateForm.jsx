import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

let initialValues={
    title:'',
    time:'',
    text:'',
    date:'',
}

const DateForm=(props)=>{
    const [user,token]=useAuth();
    const [formData, handleInputChange, handleSubmit]=useCustomForm(
        initialValues,
        postNewDate
    );
    async function postNewDate(){
        try{
            let response = await axios.post(`${URL_HOST}/api/dates/contact/${props.contact.id}/`, formData,{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            if(response.status===200){
                await props.getContactDates(props.contact.id)
                alert('Success!')
            }
        }catch(error){
            console.log(error.message)
            alert('Error, see console')
        }
    }
    return(
        <form className="Date-form" onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            <input type='time' name="time" value={formData.time} onChange={handleInputChange} />
            <input type='date' name="date" value={formData.date} onChange={handleInputChange} />
            <input type='text' name="text" value={formData.text} onChange={handleInputChange} />
            <button type="submit">Create Event</button>
        </form>
    )

}
export default DateForm