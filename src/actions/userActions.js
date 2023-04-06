import axios from 'axios'
import { Routes } from 'src/constants/enumConstants'
import { AuthConstants } from 'src/constants/userConstants'

const config = {
    headers: {
        'Content-type': 'application/json'
    }
}

export const login = (loginData) => async (dispatch) => {
    try {
        dispatch({ type: AuthConstants.USER_LOGIN_REQUEST })

        const { data } = await axios.post(Routes.BASE_URL + Routes.USER_ROUTES + '/auth', loginData, config)
        dispatch({
            type: AuthConstants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: AuthConstants.USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const register = (registerData) => async (dispatch) => {
    try {
        dispatch({ type: AuthConstants.USER_REGISTER_REQUEST })

        const { data } = await axios.post(Routes.BASE_URL + Routes.USER_ROUTES, registerData, config)
        dispatch({
            type: AuthConstants.USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AuthConstants.USER_REGISTER_FAIL,
            payload: error
        })
    }
}
