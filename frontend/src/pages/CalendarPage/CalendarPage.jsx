import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost"
import InteractionList from "../../components/InteractionList/InteractionList";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
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
        <div>
            <h2>Your Calendar</h2>
            <CalendarGrid userDates={userDates} />
        </div>
    )
}
export default CalendarPage