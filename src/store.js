import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { UserReducers } from './reducers/userReducers'
import { PlatformReducers } from './reducers/platformReducers'
import { ProductReducers } from './reducers/productReducers'
import { GenericReducers } from './reducers/genericReducers'

const reducers = combineReducers({
    userLogin: UserReducers.userLoginReducer,
    userRegister: UserReducers.userRegisterReducer,
    platformList: PlatformReducers.platformListReducer,
    platformCreate: PlatformReducers.platformCreateReducer,
    productList: ProductReducers.productListReducer,
    productCreate: ProductReducers.productCreateReducer,
    dataList: GenericReducers.dataListReducer,
    dataCreate: GenericReducers.dataCreateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
