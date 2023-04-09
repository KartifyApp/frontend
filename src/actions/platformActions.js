import axios from 'axios'
import { RouteConstants } from 'src/enumConstants'
import { ActionServices } from './actionServices'
import { PlatformConstants } from 'src/reduxConstants'

export class PlatformActions {
    static getPlatforms = () => async (dispatch, getState) => {
        try {
            dispatch({ type: PlatformConstants.PLATFORM_LIST_REQUEST })
            const { data } = await axios.get(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES, ActionServices.getConfig(getState))
            dispatch({
                type: PlatformConstants.PLATFORM_LIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: PlatformConstants.PLATFORM_LIST_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }

    static createPlatform = (platformData) => async (dispatch, getState) => {
        try {
            dispatch({ type: PlatformConstants.PLATFORM_CREATE_REQUEST })
            const { data } = await axios.post(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES, platformData, ActionServices.getConfig(getState))
            dispatch({
                type: PlatformConstants.PLATFORM_CREATE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: PlatformConstants.PLATFORM_CREATE_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }
}
