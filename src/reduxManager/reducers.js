import { CartConstants, UserConstants, ReduxConstants } from 'src/constants/enumConstants'

export class Reducers {
    static userLoginReducer = (state = { userInfo: {} }, action) => {
        switch (action.type) {
            case UserConstants.USER_LOGIN_REQUEST:
                return { ...state, loading: true }
            case UserConstants.USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload }
            case UserConstants.USER_LOGIN_FAIL:
                return { ...state, loading: false, error: action.payload }
            case UserConstants.USER_LOGOUT:
                return { ...state, loading: false, userInfo: {} }
            default:
                return state
        }
    }

    static cartReducer = (state = { cartProducts: {}, shippingAddress: {}, platformId: null }, action) => {
        switch (action.type) {
            case CartConstants.CART_UPDATE_PRODUCTS:
                return { ...state, cartProducts: action.payload.cartProducts, platformId: action.payload.platformId }
            case CartConstants.CART_SAVE_SHIPPING_ADDRESS:
                return { ...state, shippingAddress: action.payload }
            case CartConstants.CART_SAVE_PAYMENT_METHOD:
                return { ...state, paymentMethod: action.payload }
            default:
                return state
        }
    }

    static dataListReducer = (state = { loading: false, data: [] }, action) => {
        switch (action.type) {
            case ReduxConstants.LIST_REQUEST:
                return { loading: true, data: [] }
            case ReduxConstants.LIST_SUCCESS:
                return { loading: false, data: action.payload }
            default:
                return state
        }
    }

    static dataCreateReducer = (state = { loading: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.CREATE_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.CREATE_SUCCESS:
                return { loading: false, data: action.payload }
            default:
                return { loading: false, data: {} }
        }
    }

    static dataDetailsReducer = (state = { loadng: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.DETAILS_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.DETAILS_SUCCESS:
                return { loading: false, data: action.payload }
            default:
                return state
        }
    }

    static dataUpdateReducer = (state = { loadng: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.UPDATE_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.UPDATE_SUCCESS:
                return { loading: false, data: action.payload }
            default:
                return { loading: false, data: {} }
        }
    }

    static dataDeleteReducer = (state = { loadng: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.DELETE_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.DELETE_SUCCESS:
                return { loading: false, data: action.payload }
            default:
                return { loading: false, data: {} }
        }
    }
}
