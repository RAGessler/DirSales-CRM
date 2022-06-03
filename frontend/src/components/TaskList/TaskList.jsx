import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TaskList = (props)=>{
    const [displayTasks, setDisplayTasks]=useState(props.tasks)
    useEffect(()=>{
        setDisplayTasks(props.tasks)
    },[props.tasks])

    return(
        <div>
            {displayTasks.map((task, element)=>{
                return(
                    <div key={element.id}>
                        <span>
                            <h5>{task.text}</h5>
                            <h5>{task.complete}</h5>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
export default TaskList