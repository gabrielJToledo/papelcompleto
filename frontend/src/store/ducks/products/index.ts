import { productsTypes } from "./types";
import { Reducer } from "redux";

const initalState = {
    products: null,
    cart: [],
    productsPage: 1
}

const productReducer: Reducer = (state = initalState, action) => {
    switch (action.type) {
        case productsTypes.getProductsFromDB:
            return { ...state, products: action.payload }
        case productsTypes.getProductsCartFromDB:
            return { ...state, cart: action.payload }
        case productsTypes.productsPage:
            return { ...state, productsPage: action.payload }
        default:
            return state
    }
}

export default productReducer