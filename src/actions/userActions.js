import axios from 'axios'
import { RouteConstants } from 'src/enumConstants'
import { UserConstants } from 'src/reduxConstants'

const config = {
    headers: {
        'Content-type': 'application/json'
    }
}

export class UserActions {
    static login = (loginData) => async (dispatch) => {
        try {
            dispatch({ type: UserConstants.USER_LOGIN_REQUEST })

            const { data } = await axios.post(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES + '/auth', loginData, config)
            dispatch({
                type: UserConstants.USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: UserConstants.USER_LOGIN_FAIL,
                payload: error
            })
        }
    }

    static register = (registerData) => async (dispatch) => {
        try {
            dispatch({ type: UserConstants.USER_REGISTER_REQUEST })

            const { data } = await axios.post(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES, registerData, config)
            dispatch({
                type: UserConstants.USER_LOGIN_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: UserConstants.USER_REGISTER_FAIL,
                payload: error
            })
        }
    }
}
