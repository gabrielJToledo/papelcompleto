import { userTypes } from "./types";
import { Reducer } from "redux";

const initalState = {
    currentUserFromDB: null
}

const userReducer: Reducer = (state = initalState, action) => {
    switch (action.type) {
        case userTypes.getCurrentUserFromDB:
            return { ...state, currentUserFromDB: action.payload}
        default:
            return state
        }
}

export default userReducer