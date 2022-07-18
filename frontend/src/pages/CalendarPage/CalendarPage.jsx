import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost"
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";

const CalendarPage=()=>{
    const [user,token]=useAuth()
    const [userDates, setUserDates]=useState([])

    const fetchUserDates=async()=>{
        try{
            let response = await axios.get(`${URL_HOST}/api/dates/user`,{
                headers:{
                    Authorization: "Bearer "+token
                },
            });
            if (response.status===200){
                setUserDates(response.data)
            }
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchUserDates()
    },[])

    return(
        <div style={{maxWidth:'80%', margin:'auto', marginBottom:'5em', marginTop:'10em'}}>
            <center><h2><span style={{color:'blue'}}>{user.username}'s</span> Calendar</h2></center>
            <CalendarGrid userDates={userDates} />
        </div>
    )
}
export default CalendarPage