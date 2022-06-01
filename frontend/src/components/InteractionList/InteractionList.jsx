import React, {useEffect, useState} from 'react'
import ContactFilter from '../ContactFilter/ContactFilter'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import UpdateContact from '../UpdateContact/UpdateContact';
import { URL_HOST } from "../../urlHost"
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

const InteractionList = (props)=>{

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.interactions.map((interaction, element)=>{
                        return(
                            <tr key={element}>
                                <td>{interaction.date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default InteractionList