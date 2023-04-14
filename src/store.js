import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { Reducers } from './reduxManager/reducers'

const reducers = combineReducers({
    userLogin: Reducers.userLoginReducer,
    cartDetails: Reducers.cartReducer,
    dataList: Reducers.dataListReducer,
    dataCreate: Reducers.dataCreateReducer,
    dataDetails: Reducers.dataDetailsReducer,
    dataUpdate: Reducers.dataUpdateReducer,
    dataDelete: Reducers.dataDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const platformIdFromStorage = localStorage.getItem('platformId') ? JSON.parse(localStorage.getItem('platformId')) : null
const cartProductsFromStorage = localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : {}
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cartDetails: {
        platformId: platformIdFromStorage,
        cartProducts: cartProductsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        error: 0
    }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
