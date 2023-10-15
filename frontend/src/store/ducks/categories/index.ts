import { categoriesTypes } from "./types";
import { Reducer } from "redux";

const initalState = {
    categories: null
}

const productReducer: Reducer = (state = initalState, action) => {
    switch (action.type) {
        case categoriesTypes.getCategoriesFromDB:
            return { ...state, categories: action.payload}
        default:
            return state
        }
}

export default productReducer