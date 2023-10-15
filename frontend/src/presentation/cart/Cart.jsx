import React, { useState, useEffect, useMemo } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../store/hooks';
import { Buffer } from 'buffer';
import { useReloadCartFromDB } from '../../helpers/reloadCartProducts';

import PaymentModal from './PaymentPage';

function Cart() {
  const cartProducts = useAppSelector((state) => state.products.cart);

  const reloadCartFromDB = useReloadCartFromDB();

  const localStorageCartProducts = useMemo(() => JSON.parse(localStorage.getItem('cartProducts')) || [], []);

  const [productQuantities, setProductQuantities] = useState({});

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let calculatedTotal = 0;

    if (Array.isArray(cartProducts)) { // Check if cartProducts is an array
      cartProducts.forEach((product) => {
        calculatedTotal += product.price * (productQuantities[product._id] || 0);
      });
    }

    setTotalAmount(calculatedTotal);
  }, [cartProducts, productQuantities]);

  useEffect(() => {
    // Atualizar as quantidades iniciais dos produtos no estado local
    const quantities = {};
    localStorageCartProducts.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setProductQuantities(quantities);
  }, [localStorageCartProducts]);

  const getProductQuantity = (productId) => {
    return productQuantities[productId] || 0;
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedQuantities = {
      ...productQuantities,
      [productId]: Math.max((productQuantities[productId] || 0) - 1, 0)
    };

    setProductQuantities(updatedQuantities);

    const updatedCartProducts = localStorageCartProducts.reduce((acc, item) => {
      if (item.id === productId) {
        if (updatedQuantities[productId] === 0) {
          // Se a quantidade for 0, não adicionamos o item de volta ao array
          return acc;
        }
        return [...acc, { ...item, quantity: updatedQuantities[productId] }];
      }
      return [...acc, item];
    }, []);

    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));

    reloadCartFromDB();
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedQuantities = {
      ...productQuantities,
      [productId]: (productQuantities[productId] || 0) + 1
    };
    setProductQuantities(updatedQuantities);

    const updatedCartProducts = localStorageCartProducts.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: updatedQuantities[productId] || 0
        };
      }
      return item;
    });
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleGoToPayment = () => {
    setShowPaymentModal(true);
  };

  const handleGoBack = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="cart">
      <div className="wrapper featuredProducts">
        <div className="title_product_container">

          {showPaymentModal ? (
            <div className='d-flex justify-content-center align-items-center'>
              <FontAwesomeIcon icon="store" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Área de <span className="text-primary">Pagamento</span></h2>
            </div>
          ) : (
            <div className='d-flex justify-content-center align-items-center'>
              <FontAwesomeIcon icon="store" className='icon_product_card fa-xl mx-2' /> <h2 className='m-0'>Carrinho de <span className="text-primary">Compras</span></h2>
            </div>
          )}
        </div>

        <div className="division cart-division"></div>

        {showPaymentModal ? (
          <PaymentModal />
        ) : (
          <div className="cart_products">
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => {
                const imageBuffer = product.coverImage.data;
                const base64Image = Buffer.from(imageBuffer).toString('base64');
                const imageUrl = `data:image/jpeg;base64,${base64Image}`;

                const quantity = getProductQuantity(product._id);

                return (
                  <div className="cart_product_container" key={product._id}>
                    <div className="cart_product_img-container">
                      <img className='cart_product_img' src={imageUrl} title={product.name} alt={product.name} />
                    </div>

                    <div className="cart_title">
                      <h2 className='m-0'>{product.name}</h2>
                    </div>

                    <div className="cart_amount">
                      <div className="currentProduct_adct_prod">
                        <FontAwesomeIcon
                          icon="minus"
                          className='fa-lg icon_adct'
                          onClick={() => handleDecreaseQuantity(product._id)}
                        />
                        {quantity}
                        <FontAwesomeIcon
                          icon="plus"
                          className='fa-lg icon_adct'
                          onClick={() => handleIncreaseQuantity(product._id)}
                        />
                      </div>
                    </div>

                    <div className="cart_price">
                      <p className='m-0 text-center'>R$ {product.price}</p>
                    </div>


                  </div>

                );
              })
            ) : (
              <p>Nenhum produto encontrado no carrinho.</p>
            )}

            <div className='w-100 d-flex flex-column justify-content-end'>
              <p className='text-right'>Total a pagar: R$ {totalAmount.toFixed(2)}</p>

              <button
                className="btn btn-primary btn-sm my-2"
                onClick={handleGoToPayment}
              >
                Ir para o pagamento
              </button>
            </div>
          </div>
        )}

        {showPaymentModal && (
          <button className="btn btn-secondary btn-sm my-3 mx-3" onClick={handleGoBack}>
            Voltar para o carrinho
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
