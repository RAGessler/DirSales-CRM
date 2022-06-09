import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';

let initialValues = {
    user: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    twitter_handle: "",
    instagram_handle: "",
    other_handle: "",
    tag: ""
}

const ContactForm = (props) =>{
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        initialValues,
        postNewContact
    );

    async function postNewContact(){
        try{
            let response = await axios.post(`${URL_HOST}/api/contacts/`, formData,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 201){
                await props.getUserContacts(user.id)
                alert('Contact Created!')
            }
        }
        catch (error){
            console.log(error.message)
        }
    }

    return (

        <form className="form" onSubmit={handleSubmit} style={{padding:'1em', borderStyle:'inset'}}>
            <label htmlFor="first_name">First Name</label>
            <input style={{maxWidth:'60%', borderColor:'black', borderRadius:'1em'}} type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            <label htmlFor="last_name">Last Name</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}}type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            <label htmlFor="phone_number">Phone Number</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}}type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
            <label htmlFor="twitter_handle">Twitter @</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}}type="text" name="twitter_handle" value={formData.twitter_handle} onChange={handleInputChange} />
            <label htmlFor="instagram_handle">Instagram Handle</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}}type="text" name="instagram_handle" value={formData.instagram_handle} onChange={handleInputChange} />
            <label htmlFor="other_handle">Other Social Media</label>
            <input style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}}type="text" name="other_handle" value={formData.other_handle} onChange={handleInputChange} />
            <label htmlFor="tag">Group</label>
            <select style={{maxWidth:'60%',borderColor:'black', borderRadius:'1em'}} name="tag" id="tag" onChange={handleInputChange} value={formData.tag}>
                <option>Select Tag</option>
                <option value={"Client"}>Client</option>
                <option value={"Potential Client"}>Potential Client</option>
                <option value={"Potential Partner"}>Potential Partner</option>
            </select>
            <Button type="submit">Create</Button>
        </form>

    )
}
export default ContactForm;