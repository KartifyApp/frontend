import { UserConstants } from 'src/enumConstants'

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
