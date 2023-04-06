import { AuthConstants } from 'src/constants/userConstants'

export class UserReducers {
    static userLoginReducer = (state = {}, action) => {
        switch (action.type) {
            case AuthConstants.USER_LOGIN_REQUEST:
                return { loading: true }
            case AuthConstants.USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload }
            case AuthConstants.USER_LOGIN_FAIL:
                return { loading: false, error: action.payload.response.data.message }
            case AuthConstants.USER_LOGOUT:
                return {}
            default:
                return state
        }
    }

    static userRegisterReducer = (state = {}, action) => {
        switch (action.type) {
            case AuthConstants.USER_REGISTER_REQUEST:
                return { loading: true }
            case AuthConstants.USER_REGISTER_SUCCESS:
                return { loading: false, success: 'Registration Successful' }
            case AuthConstants.USER_REGISTER_FAIL:
                return { loading: false, error: action.payload.response.data.message }
            default:
                return state
        }
    }
}
