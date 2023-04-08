import axios from 'axios'
import { RouteConstants } from 'src/enumConstants'
import { ProductConstants } from 'src/reduxConstants'
import { ActionServices } from './actionServices'

export class ProductActions {
    static getProducts = (params) => async (dispatch, getState) => {
        try {
            dispatch({ type: ProductConstants.PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { ...ActionServices.getConfig(getState), params: params })
            dispatch({
                type: ProductConstants.PRODUCT_LIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ProductConstants.PRODUCT_LIST_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }

    static createProduct = (productData) => async (dispatch, getState) => {
        try {
            dispatch({ type: ProductConstants.PRODUCT_CREATE_REQUEST })
            const { data } = await axios.post(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, productData, ActionServices.getConfig(getState))
            dispatch({
                type: ProductConstants.PRODUCT_CREATE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ProductConstants.PRODUCT_CREATE_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }
}
