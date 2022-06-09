import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';
let initialValues={
    title:'',
    time:'',
    text:'',
    date:'',
}

const DateUpdate=(props)=>{
    let initialValues={
        title: props.date.title,
        time: props.date.time,
        text: props.date.text,
        date: props.date.date,
    }
    const [user,token]=useAuth();
    const [formData, handleInputChange, handleSubmit]=useCustomForm(
        initialValues,
        postNewDate
    );
    async function postNewDate(){
        try{
            let response = await axios.patch(`${URL_HOST}/api/dates/date/${props.date.id}/`, formData,{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            if(response.status===202){
                await props.getContactDates(props.contact.id)
                alert('Success!')
            }
        }catch(error){
            console.log(error.message)
            alert('Error, see console')
        }
    }
    return(
        <form style={{padding:'1em', borderStyle:'inset'}} className="form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}} type="text" name="title" value={formData.title} onChange={handleInputChange} />
            <label htmlFor="time">Time</label>
            <input style={{maxWidth:'20%',borderColor:'black', borderRadius:'1em'}} type='time' name="time" value={formData.time} onChange={handleInputChange} />
            <label htmlFor="date">Date</label>
            <input style={{maxWidth:'20%',borderColor:'black', borderRadius:'1em'}} type='date' name="date" value={formData.date} onChange={handleInputChange} />
            <Button type="submit">Update</Button>
        </form>
    )

}
export default DateUpdate