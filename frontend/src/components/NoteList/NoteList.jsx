import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Box } from '@mui/material';

const NoteList = (props)=>{
    const [displayNotes, setDisplayNotes]=useState(props.notes)
    useEffect(()=>{
        setDisplayNotes(props.notes)
    },[props.notes])

    return(
        <div>
            {displayNotes.map((note, element)=>{
                return(
                    <Box sx={{border:'2px', borderStyle:'solid', borderRadius:'1em', padding:'1em', margin:'2em'}} key={element}>
                        <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center',}}>
                            <div style={{margin:'1em'}}>
                                <h3>Date:{<br></br>}{note.date}</h3>
                            </div>
                            <div style={{margin:'1em'}}>
                                <h3>Time:{<br></br>}{note.time}</h3>
                            </div>
                        </Box>
                        <Box sx={{borderStyle:'inset', padding:'1em', margin:'1em', borderRadius:'1em'}}>
                        <p>{note.text}</p>
                        </Box>
                    </Box>
                )
            })}
        </div>
    )
}
export default NoteList