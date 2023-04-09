import axios from 'axios'
import { ReduxConstants } from 'src/enumConstants'
import { ActionServices } from './actionServices'

export class GenericActions {
    static getDataList =
        (url, params = null) =>
        async (dispatch, getState = null) => {
            try {
                dispatch({ type: ReduxConstants.LIST_REQUEST })
                const { data } = await axios.get(url, { ...ActionServices.getConfig(getState), params: params })
                dispatch({
                    type: ReduxConstants.LIST_SUCCESS,
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: ReduxConstants.LIST_FAIL,
                    payload: ActionServices.getError(error)
                })
            }
        }

    static createData =
        (url, postData) =>
        async (dispatch, getState = null) => {
            try {
                dispatch({ type: ReduxConstants.CREATE_REQUEST })
                const { data } = await axios.post(url, postData, ActionServices.getConfig(getState))
                dispatch({
                    type: ReduxConstants.CREATE_SUCCESS,
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: ReduxConstants.CREATE_FAIL,
                    payload: ActionServices.getError(error)
                })
            }
        }
}
