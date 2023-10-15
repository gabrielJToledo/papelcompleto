import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { getProductsCartFromDB } from "../store/ducks/products/actions";

export const useReloadCartFromDB = () => {
    const dispatch = useAppDispatch();

    const reloadCartFromDB = () => {
        const cartItemIds = localStorage.getItem('cartProducts');

        if (cartItemIds) {
            const idsArray = JSON.parse(cartItemIds);

            axios.get(`${process.env.REACT_APP_GET_PRODUCT_CART_BY_ID}`, {
                params: { ids: idsArray },
            }).then((data) => {
                dispatch(getProductsCartFromDB(data.data));
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    return reloadCartFromDB;
};