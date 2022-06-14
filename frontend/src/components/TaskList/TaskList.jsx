import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAuth from '../../hooks/useAuth';
import { URL_HOST } from '../../urlHost';
import TaskUpdate from '../TaskUpdate/TaskUpdate';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '@mui/material';
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
                    alert(`Task marked as Complete!`)
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
                    alert('Task marked as Incomplete!')
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
                    <Box sx={{border:'2px', borderStyle:'solid', borderRadius:'10%', padding:'1em', margin:'1em'}}  key={element}>
                            <h4>{task.text}</h4>
                            <h5>{isComplete(task)}</h5>
                            <div className='buttons'>
                                <IconButton onClick={()=>completeTask(task)}><DoneIcon/></IconButton>
                                <Popup trigger={<IconButton><EditIcon/></IconButton>} modal='true'>
                                    <TaskUpdate getContactTasks={props.getContactTasks} task={task} contact={props.contact}/>
                                </Popup>
                                <IconButton onClick={()=>deleteTask(task.id)}><DeleteIcon/></IconButton>
                            </div>
                    </Box>
                )
            })}
        </div>
    )
}
export default TaskList