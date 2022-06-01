import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InteractionFilter from '../InteractionFilter/InteractionFilter';

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
                                <td>
                                    <Popup trigger={<a>{interaction.date}</a>} modal="true">
                                        <div>
                                            <ul>
                                                <li>{interaction.type}</li>
                                                <li>{interaction.time}</li>
                                                <li>{interaction.date}</li>
                                            </ul>
                                            <p>{interaction.notes}</p>
                                        </div>
                                    </Popup>
                                </td>
                                <td>
                                    {interaction.type}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default InteractionList