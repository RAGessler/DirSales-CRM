import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm"
import axios from "axios";
import { URL_HOST } from "../../urlHost"

let initialValues={
    text: "",
    complete: false
}

const TaskForm=(props)=>{
    const [user,token]=useAuth();
    const [formData, handleInputChange, handleSubmit]=useCustomForm(
        initialValues,
        postNewTask
    );
    async function postNewTask(){
        try{
            let response = await axios.post(`${URL_HOST}/api/tasks/contact/${props.contact.id}/`, formData,{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            if(response.status===201){
                await props.getContactTasks(props.contact.id)
                alert('Success!')
            }
        }catch(error){
            console.log(error.message)
            alert('Error, see console')
        }
    }
    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="text">Enter Task:</label>
            <input type="text" name="text" value={formData.text} onChange={handleInputChange} />
            <button type="submit">Create Task</button>
        </form>
    )

}
export default TaskForm