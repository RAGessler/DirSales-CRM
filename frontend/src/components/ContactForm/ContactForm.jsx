import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

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
            }
        }
        catch (error){
            console.log(error.message)
        }
    }

    return (

        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
            <input type="text" name="twitter_handle" value={formData.twitter_handle} onChange={handleInputChange} />
            <input type="text" name="instagram_handle" value={formData.instagram_handle} onChange={handleInputChange} />
            <input type="text" name="other_handle" value={formData.other_handle} onChange={handleInputChange} />
            <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} />
            <button type="submit">Create</button>
        </form>

    )
}
export default ContactForm;