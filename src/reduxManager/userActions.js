import axios from 'axios'
import { RouteConstants, UserConstants } from 'src/enumConstants'
import { ActionServices } from './actionServices'

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
                payload: ActionServices.getError(error)
            })
        }
    }

    static logout = () => async (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch({ type: UserConstants.USER_LOGOUT })
    }
}
