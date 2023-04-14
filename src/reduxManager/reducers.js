import { CartConstants, UserConstants, ReduxConstants } from 'src/enumConstants'

export class Reducers {
    static userLoginReducer = (state = {}, action) => {
        switch (action.type) {
            case UserConstants.USER_LOGIN_REQUEST:
                return { loading: true }
            case UserConstants.USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload }
            case UserConstants.USER_LOGIN_FAIL:
                return { loading: false, error: action.payload }
            case UserConstants.USER_LOGOUT:
                return { loading: false }
            default:
                return state
        }
    }

    static cartReducer = (state = { cartProducts: {}, shippingAddress: {}, platformId: null, error: 0 }, action) => {
        switch (action.type) {
            case CartConstants.CART_UPDATE_PRODUCTS:
                return { ...state, cartProducts: action.payload.cartProducts, platformId: action.payload.platformId }
            case CartConstants.CART_UPDATE_FAIL:
                return { ...state, error: state.error + 1 }
            default:
                return state
        }
    }

    static dataListReducer = (state = { data: [], loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.LIST_REQUEST:
                return { loading: true, data: [] }
            case ReduxConstants.LIST_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.LIST_FAIL:
                return { loading: false, error: action.payload, data: [] }
            case ReduxConstants.LIST_RESET:
                return { loading: false, data: [] }
            default:
                return state
        }
    }

    static dataCreateReducer = (state = { loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.CREATE_REQUEST:
                return { loading: true }
            case ReduxConstants.CREATE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.CREATE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.CREATE_RESET:
                return { loading: false }
            default:
                return state
        }
    }

    static dataDetailsReducer = (state = { loadng: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.DETAILS_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.DETAILS_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.DETAILS_FAIL:
                return { loading: false, error: action.payload, data: {} }
            case ReduxConstants.DETAILS_RESET:
                return { loading: false, data: {} }
            default:
                return state
        }
    }

    static dataUpdateReducer = (state = { loadng: false }, action) => {
        switch (action.type) {
            case ReduxConstants.UPDATE_REQUEST:
                return { loading: true }
            case ReduxConstants.UPDATE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.UPDATE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.UPDATE_RESET:
                return { loading: false }
            default:
                return state
        }
    }

    static dataDeleteReducer = (state = { loadng: false }, action) => {
        switch (action.type) {
            case ReduxConstants.DELETE_REQUEST:
                return { loading: true }
            case ReduxConstants.DELETE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.DELETE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.DELETE_RESET:
                return { loading: false }
            default:
                return state
        }
    }
}