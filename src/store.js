import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { UserReducers } from './reducers/userReducers'
import { PlatformReducers } from './reducers/platformReducers'
import { ProductReducers } from './reducers/productReducers'

const reducers = combineReducers({
    userLogin: UserReducers.userLoginReducer,
    userRegister: UserReducers.userRegisterReducer,
    platformList: PlatformReducers.platformsListReducer,
    productList: ProductReducers.productListReducer,
    productCreate: ProductReducers.productCreateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
