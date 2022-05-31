import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

let initialValues = {
first_name: "",
last_name: "",
phone_number: "",
twitter_handle: "",
instagram_handle: "",
other_handle: "",
tag: ""
}

const UpdateContact = (props) =>{
    initialValues = {
        first_name: props.contact.first_name,
        last_name: props.contact.last_name,
        phone_number: props.contact.phone_number,
        twitter_handle: props.contact.twitter_handle,
        instagram_handle: props.contact.instagram_handle,
        other_handle: props.contact.other_handle,
        tag: props.contact.tag
    }
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        updateContact
        );
    
        
    async function updateContact(){
        try{
            let response = await axios.patch(`${URL_HOST}/api/contacts/${props.contact.id}/`, formData,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 202){
                await props.getUserContacts(user.id)
                alert('Success!')
            }
        }
        catch (error){
            console.log(error.message)
            alert(error.message)
        }
    }

    return (

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
            <label htmlFor="twitter_handle">Twitter @</label>
            <input type="text" name="twitter_handle" value={formData.twitter_handle} onChange={handleInputChange} />
            <label htmlFor="instagram_handle">Instagram Handle</label>
            <input type="text" name="instagram_handle" value={formData.instagram_handle} onChange={handleInputChange} />
            <label htmlFor="other_handle">Other Social Media</label>
            <input type="text" name="other_handle" value={formData.other_handle} onChange={handleInputChange} />
            <label htmlFor="tag">Group</label>
            <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} />
            <button type="submit">Submit Changes</button>
        </form>

    )
}
export default UpdateContact;