import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './WhatsappButton.css'

function WhatsappButton() {
    return (
        <Link className="whats_container" to="/">
            <FontAwesomeIcon className='whats_icon' icon={['fab', 'whatsapp']} />

            <h3 className='m-0 h5'>Whatsapp</h3>
        </Link>
    )
}

export default WhatsappButton