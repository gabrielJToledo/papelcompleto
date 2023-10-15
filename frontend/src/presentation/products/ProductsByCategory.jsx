import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { Buffer } from 'buffer';

function ProductsByCategory() {
    const [getProdByCategoryFromDB, setGetProdByCategoryFromDB] = useState(null)

    const currentURL = window.location.href

    const bodyURL = currentURL.split('/');

    const lastPartURL = bodyURL[bodyURL.length - 1];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_GET_PRODUCTS_FROM_CATEGORY}/${lastPartURL}`).then((data) =>
            setGetProdByCategoryFromDB(data.data)
        ).catch((err) => 
        setGetProdByCategoryFromDB(null)
        )
    }, [lastPartURL])

    console.log(getProdByCategoryFromDB)

    return (
        <div className="prodByCategory">
            <div className="products d-flex justify-content-center">
                <div className="wrapper d-flex justify-content-center my-5 featuredProducts">
                    <div className="title_product_container">
                        <FontAwesomeIcon icon="store" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Papeis de Parede <span className="text-primary">Papel Pintado</span></h2>
                    </div>
                    <div className="division"></div>
                    <div className="card_product_container ">
                        {getProdByCategoryFromDB === null ? (
                            <div className='d-flex justify-content-center w-100'>
                                <p className='h2 fw-bold my-5'>Não existe produtos com essa categoria...</p>
                            </div>
                        ) : (
                            getProdByCategoryFromDB.map((product) => {
                                const imageBuffer = product.coverImage.data;
                                const base64Image = Buffer.from(imageBuffer).toString('base64');
                                const imageUrl = `data:image/jpeg;base64,${base64Image}`;
                                return (
                                    <div key={product._id} className="product_card col-3">
                                        <Link className='link_card_product' to={`/produto/${product._id}`}>
                                            <img src={imageUrl} title='Produto em Destaque' alt="Produto em Destaque" />
                                            <div className="description_card_product">
                                                <h2 className='title_card_product'>{product.name}</h2>
                                                <h2 className='price_card_product'>R$ {product.price} m2</h2>
                                                <h2 className='discount_card_product'>Em até 6x sem juros 5% de desconto no PIX</h2>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsByCategory;
