import React from 'react'
import './Products.css'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { productsPage } from '../../store/ducks/products/actions';

function Products() {
    const dispatch = useAppDispatch();
    const getProductsFromDB = useAppSelector((state) => state.products.products);
    const currentPage = useAppSelector((state) => state.products.productsPage);
    const totalPages = 4;

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(productsPage(currentPage - 1));
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(productsPage(currentPage + 1));
        }
    }

    return (
        <div className="products d-flex justify-content-center">

            <div className="wrapper d-flex justify-content-center my-5 featuredProducts">

                <div className="title_product_container">
                    <FontAwesomeIcon icon="store" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Papeis de Parede <span className="text-primary">Papel Pintado</span></h2>
                </div>

                <div className="division"></div>

                <div className="card_product_container ">

                    {getProductsFromDB !== null && getProductsFromDB.map((product: any) => {


                        const imageBuffer = product.coverImage.data; // Substitua "product.image.data" pelo caminho correto do buffer da imagem
                        const base64Image = Buffer.from(imageBuffer).toString('base64');
                        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

                        return <div key={product._id} className="product_card col-3">
                            <Link className='link_card_product' to={`/produto/${product._id}`}>
                                <img src={imageUrl} title='Produto em Destaque' alt="Produto em Destaque" />
                                <div className="description_card_product">
                                    <h2 className='title_card_product'>{product.name}</h2>
                                    <h2 className='price_card_product'>R$ {product.price} m2</h2>
                                    <h2 className='discount_card_product'>Em até 6x sem juros 5% de desconto no PIX</h2>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>

                <div className="buttons_page d-flex justify-content-center align-items-center">
                    <button className='page_button' onClick={handlePrevPage}>Página anterior</button>
                    <button className='page_button' onClick={handleNextPage}>Próxima página</button>
                </div>
            </div>
        </div>
    )
}

export default Products