import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAuth from '../../hooks/useAuth';
import { URL_HOST } from '../../urlHost';
import DateUpdate from '../DateUpdate/DateUpdate';

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
                    <div key={element}>
                            <h5>{date.title}</h5>
                            <h6>{date.date}</h6>
                            <div className='buttons'>
                                <Popup trigger={<button>Edit</button>} modal='true'>
                                    <DateUpdate getContactDates={props.getContactDates} date={date} contact={props.contact}/>
                                </Popup>
                                <button onClick={()=>deleteDate(date.id)}>Delete</button>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}
export default DateList

//props
//getContactDates
//contact