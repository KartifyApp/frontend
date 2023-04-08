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
}
