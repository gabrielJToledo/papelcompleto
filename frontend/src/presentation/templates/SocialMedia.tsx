import React from 'react'
import './SocialMedia.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function SocialMedia() {
  return (
    <div className="socialmedia">
      <Link className='social_links' to={'/'}>
        <FontAwesomeIcon className='social_link' icon={['fab', 'instagram']} />
      </Link>

      <Link className='social_links' to={'/'}>
        <FontAwesomeIcon className='social_link' icon={['fab', 'facebook']} />
      </Link>

      <Link className='social_links' to={'/'}>
        <FontAwesomeIcon className='social_link' icon={['fab', 'whatsapp']} />
      </Link>
    </div>
  )
}

export default SocialMedia