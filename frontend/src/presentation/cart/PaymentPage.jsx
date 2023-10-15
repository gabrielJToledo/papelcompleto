import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';
import './PaymentPage.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

initMercadoPago('TEST-f6ff1624-8ef5-4e67-8e1c-69a4a8baff1f');

function PaymentPage() {

  const [preferenceId, setPreferenceId] = useState(null);

  const cartProducts = useAppSelector((state) => state.products.cart)
  const cartProductsFromLocalStorage = JSON.parse(localStorage.getItem('cartProducts'))

  const currentCartProductsFromCheckout = cartProductsFromLocalStorage.map((item) => {
    const product = cartProducts.find((p) => p._id === item.id);
    return {
      ...product,
      quantity: item.quantity
    };
  });

  const filteredCartProducts = currentCartProductsFromCheckout.map(({ _id, name, price, quantity }) => ({
    id: _id,
    title: name,
    unit_price: price,
    quantity: quantity
  }));

  const createPreference = async () => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_PAYMENT_CHECKOUT}`, filteredCartProducts)

      const { id } = response.data
      return id
    } catch (error) {

    }
  };

  useEffect(() => {
    const fetchPreferenceId = async () => {
      try {
        const id = await createPreference();

        if (id) {
          setPreferenceId(id);
        }
      } catch (error) {
      }
    };

    fetchPreferenceId();
  }, []);

  console.log(preferenceId)

  return (
    <div className='px-3'>
      <div>

          {preferenceId != null &&  <Wallet initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }} /> }
        
      </div>
    </div>
  );
}

export default PaymentPage;
