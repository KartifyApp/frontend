import { CartConstants, STATE_RESET_TIME } from 'src/constants/enumConstants'
import { ActionServices } from './actionServices'

export class CartActions {
    static addToCart = (product) => async (dispatch, getState) => {
        const {
            cartDetails: { cartProducts, platformId }
        } = getState()
        if (platformId && product.platformId !== platformId) {
            dispatch({ type: CartConstants.CART_UPDATE_FAIL, payload: 'Products must be from same platform' })
            await ActionServices.sleep(STATE_RESET_TIME)
            dispatch({ type: CartConstants.CART_ERROR_RESET })
        } else {
            dispatch({
                type: CartConstants.CART_UPDATE_PRODUCTS,
                payload: { cartProducts: { ...cartProducts, [product.productId]: 1 }, platformId: platformId || product.platformId }
            })
        }
        localStorage.setItem('cartProducts', JSON.stringify(getState().cartDetails.cartProducts))
        localStorage.setItem('platformId', JSON.stringify(getState().cartDetails.platformId))
    }

    static removeFromcart = (product) => (dispatch, getState) => {
        const {
            cartDetails: { cartProducts, platformId }
        } = getState()
        delete cartProducts[product.productId]
        dispatch({
            type: CartConstants.CART_UPDATE_PRODUCTS,
            payload: { cartProducts: cartProducts, platformId: Object.keys(cartProducts).length > 1 ? platformId : null }
        })
        localStorage.setItem('cartProducts', JSON.stringify(getState().cartDetails.cartProducts))
        localStorage.setItem('platformId', JSON.stringify(getState().cartDetails.platformId))
    }

    static increaseQuantity = (product) => async (dispatch, getState) => {
        const {
            cartDetails: { cartProducts, platformId }
        } = getState()
        if (cartProducts[product.productId] === product.stockCount) {
            dispatch({ type: CartConstants.CART_UPDATE_FAIL, payload: 'Cannot exceed stock count' })
            await ActionServices.sleep(STATE_RESET_TIME)
            dispatch({ type: CartConstants.CART_ERROR_RESET })
        } else {
            cartProducts[product.productId] += 1
            dispatch({ type: CartConstants.CART_UPDATE_PRODUCTS, payload: { cartProducts, platformId } })
        }
        localStorage.setItem('cartProducts', JSON.stringify(getState().cartDetails.cartProducts))
        localStorage.setItem('platformId', JSON.stringify(getState().cartDetails.platformId))
    }

    static decrementQuantity = (product) => (dispatch, getState) => {
        const {
            cartDetails: { cartProducts, platformId }
        } = getState()
        if (cartProducts[product.productId] === 1) {
            delete cartProducts[product.productId]
            dispatch({
                type: CartConstants.CART_UPDATE_PRODUCTS,
                payload: { cartProducts: cartProducts, platformId: cartProducts.length > 1 ? platformId : null }
            })
        } else {
            cartProducts[product.productId] -= 1
            dispatch({ type: CartConstants.CART_UPDATE_PRODUCTS, payload: { cartProducts, platformId } })
        }
        localStorage.setItem('cartProducts', JSON.stringify(getState().cartDetails.cartProducts))
        localStorage.setItem('platformId', JSON.stringify(getState().cartDetails.platformId))
    }

    static clearCart = () => (dispatch, getState) => {
        dispatch({ type: CartConstants.CART_UPDATE_PRODUCTS, payload: { cartProducts: [], platformId: null } })
        localStorage.setItem('cartProducts', JSON.stringify(getState().cartDetails.cartProducts))
        localStorage.setItem('platformId', JSON.stringify(getState().cartDetails.platformId))
    }

    static updateShippingAddress = (address) => (dispatch, getState) => {
        dispatch({ type: CartConstants.CART_SAVE_SHIPPING_ADDRESS, payload: address })
        localStorage.setItem('shippingAddress', JSON.stringify(getState().cartDetails.shippingAddress))
    }

    static updatePaymentMethod = (method) => (dispatch, getState) => {
        dispatch({ type: CartConstants.CART_SAVE_PAYMENT_METHOD, payload: method })
        localStorage.setItem('paymentMethod', JSON.stringify(getState().cartDetails.paymentMethod))
    }
}
