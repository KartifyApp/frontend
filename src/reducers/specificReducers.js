import { CartConstants, UserConstants } from 'src/enumConstants'

export class UserReducers {
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
}

export class CartReduers {
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
}
