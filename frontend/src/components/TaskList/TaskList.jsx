import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAuth from '../../hooks/useAuth';
import { URL_HOST } from '../../urlHost';
import TaskUpdate from '../TaskUpdate/TaskUpdate';
const TaskList = (props)=>{
    const [user, token]=useAuth();
    const [displayTasks, setDisplayTasks]=useState(props.tasks)
    useEffect(()=>{
        setDisplayTasks(props.tasks)
    },[props.tasks])

    const isComplete = (task)=>{
        if(task.complete===true){
            return('Completed')
        }
        else{
            return('Incomplete')
        }
    }

    async function completeTask(task){
        if(task.complete===false){
            try{
                let response = await axios.patch(`${URL_HOST}/api/tasks/task/${task.id}/`,{complete: true},{
                    headers:{
                        Authorization:'Bearer '+token
                    }
                })
                if(response.status===202){
                    props.getContactTasks(props.contact.id)
                    alert('Success!')
                }
            }catch(error){
                console.log(error.message)
            }
        }
        else{
            try{
                let response = await axios.patch(`${URL_HOST}/api/tasks/task/${task.id}/`, {complete: false},{
                    headers:{
                        Authorization:'Bearer '+token
                    }
                })
                if(response.status===202){
                    props.getContactTasks(props.contact.id)
                    alert('Success')
                }
            }catch(error){
                console.log(error.message)
            }
        }
    }
    async function deleteTask(taskId){
        try{
            let response = await axios.delete(`${URL_HOST}/api/tasks/task/${taskId}/`,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 204){
                await props.getContactTasks(props.contact.id)
                alert('Success!')
            }
        }
        catch (error){
            console.log(error.message)
            alert(error.message)
        }
    }


    return(
        <div>
            {displayTasks.map((task, element)=>{
                return(
                    <div key={element.id}>
                            <h5>{task.text}</h5>
                            <h5>{isComplete(task)}</h5>
                            <div className='buttons'>
                                <Popup trigger={<button>Edit</button>} modal='true'>
                                    <TaskUpdate getContactTasks={props.getContactTasks} task={task} contact={props.contact}/>
                                </Popup>
                                <button onClick={()=>completeTask(task)}>Toggle Completion</button>
                                <button onClick={()=>deleteTask(task.id)}>Delete</button>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}
export default TaskList