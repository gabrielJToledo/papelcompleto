import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Environments.css'
import React from 'react'
import { Link } from 'react-router-dom'

const productImg = require('../../assets/images/product.jpg')

function Environments() {
    return (
        <div className="featuredProducts wrapper">
            <div className="title_product_container">
                <FontAwesomeIcon icon="store" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Nossos <span className="text-primary">Ambientes</span></h2>
            </div>

            <div className="division division-environments"></div>

            <div className="environments_container">
                <div className="env">
                    <div className="env_img_container">
                        <img src={productImg} alt="Nossos ambientes" />
                    </div>

                    <div className="env_card_container">
                        <h2 className='text-uppercase text-center'>Sala de estar</h2>

                        <p className='text-center'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        <Link to={''} className="button-48" role="button"><span className="text">Saiba Mais</span></Link>
                    </div>

                    <div className="env_img_container">
                        <img src={productImg} alt="Nossos ambientes" />
                    </div>

                    <div className="env_card_container">
                        <h2 className='text-uppercase text-center'>Banheiro</h2>

                        <p className='text-center'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        <Link to={''} className="button-48" role="button"><span className="text">Saiba Mais</span></Link>
                    </div>

                    <div className="env_card_container">
                        <h2 className='text-uppercase text-center'>Cozinha</h2>

                        <p className='text-center'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        <Link to={''} className="button-48" role="button"><span className="text">Saiba Mais</span></Link>
                    </div>

                    <div className="env_img_container">
                        <img src={productImg} alt="Nossos ambientes" />
                    </div>

                    <div className="env_card_container">
                        <h2 className='text-uppercase text-center'>Quartos</h2>

                        <p className='text-center'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        <Link to={''} className="button-48" role="button"><span className="text">Saiba Mais</span></Link>
                    </div>

                    <div className="env_img_container">
                        <img src={productImg} alt="Nossos ambientes" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Environments
