import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAuth from '../../hooks/useAuth';
import { URL_HOST } from '../../urlHost';
import DateUpdate from '../DateUpdate/DateUpdate';
import { IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
const DateList = (props)=>{
    const [user, token]=useAuth();
    const [displayDates, setDisplayDates]=useState(props.dates)
    useEffect(()=>{
        setDisplayDates(props.dates)
    },[props.dates])

    async function deleteDate(dateId){
        try{
            let response = await axios.delete(`${URL_HOST}/api/dates/date/${dateId}/`,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 204){
                await props.getContactDates(props.contact.id)
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
            {displayDates.map((date, element)=>{
                return(
                    <Box sx={{border:'2px', borderStyle:'solid', borderRadius:'10%', padding:'1em', margin:'1em'}} key={element}>
                            <h4>{date.title}</h4>
                            <h4>{date.date}</h4>
                            <div className='buttons'>
                                <Popup trigger={<IconButton><Edit/></IconButton>} modal='true'>
                                    <DateUpdate getContactDates={props.getContactDates} date={date} contact={props.contact}/>
                                </Popup>
                                <IconButton onClick={()=>deleteDate(date.id)}><Delete/></IconButton>
                            </div>
                    </Box>
                )
            })}
        </div>
    )
}
export default DateList
