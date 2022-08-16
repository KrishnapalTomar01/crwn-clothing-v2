import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export const fetchCategoriesStart = () => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATGEORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATGEORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATGEORIES_FAILED, error);