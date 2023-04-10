import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { UserReducers } from './reducers/userReducers'
import { GenericReducers } from './reducers/genericReducers'

const reducers = combineReducers({
    userLogin: UserReducers.userLoginReducer,
    userRegister: UserReducers.userRegisterReducer,
    dataList: GenericReducers.dataListReducer,
    dataCreate: GenericReducers.dataCreateReducer,
    dataDetails: GenericReducers.dataDetailsReducer,
    dataUpdate: GenericReducers.dataUpdateReducer,
    dataDelete: GenericReducers.dataDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
