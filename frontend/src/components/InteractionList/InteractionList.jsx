import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InteractionFilter from '../InteractionFilter/InteractionFilter';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InteractionFilterDate from '../InteractionFilterDate/InteractionFilterDate';
const InteractionList = (props)=>{
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
            else if (searchTerm=="!"){
                return true;
            }
            else{
                return false;
            }})
            setDisplayInteractions(filteredInteractions)
    }

    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{<InteractionFilterDate submitSearch={filterInteractions} />}</TableCell>
                        <TableCell align='right'>{<InteractionFilter submitSearch={filterInteractions} />}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayInteractions.map((interaction, element)=>{
                        return(
                            <TableRow key={element}>
                                <TableCell>
                                    <Popup trigger={<a>{interaction.date}</a>} modal="true">
                                        <div style={{padding:'1em', borderStyle:'inset'}}>
                                            <ul>
                                                <li>{interaction.type}</li>
                                                <li>{interaction.time}</li>
                                                <li>{interaction.date}</li>
                                            </ul>
                                            <center><p>{interaction.notes}</p></center>
                                        </div>
                                    </Popup>
                                </TableCell>
                                <TableCell align='center'>
                                    {interaction.type}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default InteractionList