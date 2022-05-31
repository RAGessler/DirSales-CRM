import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarGrid = (props)=>{
    const [mappedEvents, setMappedEvents]=useState([])


    function mapDates(){
        let result = props.userDates.map((element)=>{
            return{title: element.title, date: element.date}
        });
        setMappedEvents(result);
        console.log(result)
        console.log(mappedEvents)
    }
    
    useEffect(()=>{
        mapDates();
    },[props.userDates])

    return(
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={[false]}
            events={mappedEvents}
            />
        )
}
export default CalendarGrid

//props.userDates