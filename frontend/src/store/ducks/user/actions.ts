import { action } from "typesafe-actions";
import { userTypes } from "./types";

export const getCurrentUserFromDB = (payload: any) => action(userTypes.getCurrentUserFromDB, payload)
