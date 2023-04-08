import { UserConstants } from 'src/reduxConstants'

export class UserReducers {
    static userLoginReducer = (state = {}, action) => {
        switch (action.type) {
            case UserConstants.USER_LOGIN_REQUEST:
                return { loading: true }
            case UserConstants.USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload }
            case UserConstants.USER_LOGIN_FAIL:
                return { loading: false, error: action.payload.response.data.message }
            case UserConstants.USER_LOGOUT:
                return {}
            default:
                return state
        }
    }

    static userRegisterReducer = (state = {}, action) => {
        switch (action.type) {
            case UserConstants.USER_REGISTER_REQUEST:
                return { loading: true }
            case UserConstants.USER_REGISTER_SUCCESS:
                return { loading: false, userInfo: action.payload }
            case UserConstants.USER_REGISTER_FAIL:
                return { loading: false, error: action.payload.response.data.message }
            default:
                return state
        }
    }
}
