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
        <form className="Date-form" onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            <input type='time' name="time" value={formData.time} onChange={handleInputChange} />
            <input type='date' name="date" value={formData.date} onChange={handleInputChange} />
            <input type='text' name="text" value={formData.text} onChange={handleInputChange} />
            <button type="submit">Update</button>
        </form>
    )

}
export default DateUpdate