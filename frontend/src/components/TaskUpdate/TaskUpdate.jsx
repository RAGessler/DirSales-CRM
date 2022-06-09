import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"
import Button from '@mui/material/Button';

let initialValues={
    text: "",
    complete: false
}

const TaskUpdate = (props)=>{
    initialValues = {
        text: props.task.text,
        complete: props.task.complete
    }

    const [user,token]=useAuth();
    const [formData, handleInputChange, handleSubmit, reset]=useCustomForm(
        initialValues,
        updateTask
    );

    async function updateTask(){
        try{
            let response = await axios.patch(`${URL_HOST}/api/tasks/task/${props.task.id}/`, formData,{
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            if(response.status===202){
                await props.getContactTasks(props.contact.id)
                alert(`Success!`)
                console.log(props.contact.id)
            }
        }catch(error){
            console.log(error.message)
            alert(error.message)

        }
    }
    return(
        <form className="form" style={{padding:'1em', borderStyle:'inset'}} onSubmit={handleSubmit}>
            <label htmlFor="text">Edit Task:</label>
            <input style={{maxWidth:'60%', borderColor:'black', borderRadius:'1em'}} type="text" name="text" value={formData.text} onChange={handleInputChange} />
            <Button type="submit">Update</Button>
        </form>
    )

}
export default TaskUpdate