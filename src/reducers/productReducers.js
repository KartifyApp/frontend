import { ProductConstants } from 'src/reduxConstants'

export class ProductReducers {
    static productListReducer = (state = { products: [] }, action) => {
        switch (action.type) {
            case ProductConstants.PRODUCT_LIST_REQUEST:
                return { loading: true, products: [] }
            case ProductConstants.PRODUCT_LIST_SUCCESS:
                return { loading: false, products: action.payload }
            case ProductConstants.PRODUCT_LIST_FAIL:
                return { loading: false, error: action.payload, products: [] }
            default:
                return state
        }
    }

    static productCreateReducer = (state = {}, action) => {
        switch (action.type) {
            case ProductConstants.PRODUCT_CREATE_REQUEST:
                return { loading: true }
            case ProductConstants.PRODUCT_CREATE_SUCCESS:
                return { loading: false, product: action.payload }
            case ProductConstants.PRODUCT_CREATE_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state
        }
    }
}
