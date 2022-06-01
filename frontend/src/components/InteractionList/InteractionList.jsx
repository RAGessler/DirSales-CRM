import React, {useEffect, useState} from 'react'
import ContactFilter from '../ContactFilter/ContactFilter'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import UpdateContact from '../UpdateContact/UpdateContact';
import { URL_HOST } from "../../urlHost"
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom';
import InteractionFilter from '../InteractionFilter/InteractionFilter';

const InteractionList = (props)=>{
    const [user, token] = useAuth()
    const [displayInteractions, setDisplayInteractions]=useState(props.interactions)

    useEffect(()=>{
        setDisplayInteractions(props.interactions)
    },[props.interactions])

    function filterInteractions(searchTerm){
        let filteredInteractions = props.interactions.filter((interaction)=>{
            if (interaction.type.includes(searchTerm)||
            interaction.date.includes(searchTerm)){
                return true;
            }
            else{
                return false;
            }})
            setDisplayInteractions(filteredInteractions)
    }

    return(
        <div>
            <InteractionFilter submitSearch={filterInteractions} />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {displayInteractions.map((interaction, element)=>{
                        return(
                            <tr key={element}>
                                <td>{interaction.date}</td>
                                <td>{interaction.type}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default InteractionList