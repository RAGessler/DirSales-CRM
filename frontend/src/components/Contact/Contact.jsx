import React, { useState, useEffect } from 'react';

const Contact = (props) =>{

    return(
        <div className='contact-box'>
            <h6>{props.contact.first_name} {props.contact.last_name}</h6>
        </div>
    )
}
export default Contact