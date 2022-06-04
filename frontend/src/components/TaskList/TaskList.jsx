import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TaskUpdate from '../TaskUpdate/TaskUpdate';
const TaskList = (props)=>{
    const [displayTasks, setDisplayTasks]=useState(props.tasks)
    useEffect(()=>{
        setDisplayTasks(props.tasks)
    },[props.tasks])

    const isComplete = (task)=>{
        if(task.complete===true){
            return('Complete')
        }
        else{
            return('Incomplete')
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
                            </div>
                    </div>
                )
            })}
        </div>
    )
}
export default TaskList