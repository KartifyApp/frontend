import axios from 'axios'
import { ReduxConstants, STATE_RESET_TIME } from 'src/enumConstants'
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
                await ActionServices.sleep(STATE_RESET_TIME)
                dispatch({ type: ReduxConstants.CREATE_RESET })
            } catch (error) {
                dispatch({
                    type: ReduxConstants.CREATE_FAIL,
                    payload: ActionServices.getError(error)
                })
            }
        }

    static getDataDetails =
        (url, params = null) =>
        async (dispatch, getState) => {
            try {
                dispatch({ type: ReduxConstants.DETAILS_REQUEST })
                const { data } = await axios.get(url, { ...ActionServices.getConfig(getState), params: params })
                dispatch({
                    type: ReduxConstants.DETAILS_SUCCESS,
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: ReduxConstants.DETAILS_FAIL,
                    payload: ActionServices.getError(error)
                })
            }
        }

    static updateData = (url, putData) => async (dispatch, getState) => {
        try {
            dispatch({ type: ReduxConstants.UPDATE_REQUEST })
            const { data } = await axios.put(url, putData, ActionServices.getConfig(getState))
            dispatch({
                type: ReduxConstants.UPDATE_SUCCESS,
                payload: data
            })
            await ActionServices.sleep(STATE_RESET_TIME)
            dispatch({ type: ReduxConstants.UPDATE_RESET })
        } catch (error) {
            dispatch({
                type: ReduxConstants.UPDATE_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }

    static deleteData = (url) => async (dispatch, getState) => {
        try {
            dispatch({ type: ReduxConstants.DELETE_REQUEST })
            const { data } = await axios.delete(url, ActionServices.getConfig(getState))
            dispatch({
                type: ReduxConstants.DELETE_SUCCESS,
                payload: data
            })
            await ActionServices.sleep(STATE_RESET_TIME)
            dispatch({ type: ReduxConstants.DELETE_RESET })
        } catch (error) {
            dispatch({
                type: ReduxConstants.DELETE_FAIL,
                payload: ActionServices.getError(error)
            })
        }
    }
}
