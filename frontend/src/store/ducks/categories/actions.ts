import { action } from "typesafe-actions";
import { categoriesTypes } from "./types";

export const getCategoriesFromDB = (payload: any) => action(categoriesTypes.getCategoriesFromDB, payload)
