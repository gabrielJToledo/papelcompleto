import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialMedia from './SocialMedia'
import WhatsappButton from './WhatsappButton'

const paymentMethods = require('../../assets/images/payment.png')
const logo = require('../../assets/images/logo.png')

function Footer() {
  return (
    <footer className="footer">
      <div className="payment_container">
        <div className="wrapper">
          <div className="options_payment">
            <h2>Métodos de pagamento</h2>
            <div className="division"></div>
            <img src={paymentMethods} title='Formas de Pagamento' alt="Formas de Pagamento" />
          </div>
        </div>
      </div>

      <div className="footer_info">
        <div className="wrapper d-flex justify-content-between my-4">
          <div className="info_logo px-5">
            <img className='logo_header' src={logo} title='Logo Papel Pintado' alt="Logo Papel Pintado" />
            <h2 className='text-white'>Papel Pintado</h2>
            <SocialMedia />
          </div>

          <div className="info_links">
            <h2 className='h4 text-white text-center'>Links do site</h2>
            <Link className='info_link' to={''}>Home</Link>
            <Link className='info_link' to={'/produtos'}>Produtos</Link>
          </div>

          <div className="info_com px-5">
            <h2 className='h4 text-white text-center'>Contato</h2>
            <Link className='contact_link' to={''}> <FontAwesomeIcon icon="mobile-screen-button" className='mx-2 text-white' /> (12) 2222-2222</Link>
            <Link className='contact_link' to={''}> <FontAwesomeIcon icon="mobile-screen-button" className='mx-2 text-white' /> (12) 92222-2222</Link>
            <Link className='contact_link' to={''}> <FontAwesomeIcon icon="envelope" className='mx-2 text-white' /> papelpintado@teste.com.br</Link>
          </div>
        </div>
      </div>

      <div className="footer_copyright">
        <h2 className='text_copyright text-white my-3'>Copyright ® Papel Pintado Lei Nº 9.610, De 19 De Fevereiro De 1998</h2>
      </div>

      <WhatsappButton />
    </footer>
  )
}

export default Footer