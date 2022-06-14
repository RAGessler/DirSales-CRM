import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const CalendarGrid = (props)=>{
    const [mappedEvents, setMappedEvents]=useState([])


    function mapDates(userDates){
        let result = userDates.map((element)=>{
            return{title: element.title, date: element.date}
        });
        setMappedEvents(result);
        console.log(result)
        console.log(mappedEvents)
    }

    function handleDateClick(){
        alert('hi mom!')
    }
    useEffect(()=>{
        mapDates(props.userDates);
    },[props.userDates])

    return(
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={[false]}
            events={mappedEvents}
            />
        )
}
export default CalendarGrid

//props.userDates