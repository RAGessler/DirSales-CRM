import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const NoteList = (props)=>{
    const [displayNotes, setDisplayNotes]=useState(props.notes)
    useEffect(()=>{
        setDisplayNotes(props.notes)
    },[props.notes])

    return(
        <div>
            {displayNotes.map((note, element)=>{
                return(
                    <div key={element.id}>
                        <h4>{note.date}</h4>
                        <h6>{note.time}</h6>
                        <p>{note.text}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default NoteList