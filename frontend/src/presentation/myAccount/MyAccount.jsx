import React from 'react'
import './MyAccount.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector } from '../../store/hooks'

function MyAccount() {
    const currentUser = useAppSelector(state => state.user.currentUserFromDB)

    return (
        <div className="py-4 d-flex justify-content-center">
            <div className="myAccount wrapper p-2 d-flex flex-column">
                <div className="title_product_container">
                    <FontAwesomeIcon icon="user" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Minha <span className="text-primary">Conta</span></h2>
                </div>
                <div className="division"></div>

                <div className="infoAccount p-4 d-flex flex-wrap">
                    <div className=" px-3">
                        <p className='text-secondary'>Nome: {currentUser.name}</p>
                        <p className='text-secondary'>E-mail: {currentUser.email}</p>
                        <p className='text-secondary'>Whatsapp: {currentUser.whatsapp}</p>
                        <p className='text-secondary'>CEP: {currentUser.cep ? currentUser.cep : 'Não informado'}</p>
                        <p className='text-secondary'>Cidade: {currentUser.city ? currentUser.city : 'Não informado'}</p>
                    </div>

                    <div className=' px-3'>
                        <p className='text-secondary'>Estado: {currentUser.state ? currentUser.state : 'Não informado'}</p>
                        <p className='text-secondary'>Bairro: {currentUser.neighborhood ? currentUser.neighborhood : 'Não informado'}</p>
                        <p className='text-secondary'>Rua: {currentUser.street ? currentUser.street : 'Não informado'}</p>
                        <p className='text-secondary'>Número: {currentUser.houseNumber ? currentUser.houseNumber : 'Não informado'}</p>
                        <p className='text-secondary'>Complemento: {currentUser.addressComplement ? currentUser.addressComplement : 'Não informado'}</p>
                    </div>
                </div>
                <button className='mx-3 p-2 buy_button buy_button-scaleMinus'>Editar Informações da Conta</button>
            </div>
        </div>
    )
}

export default MyAccount