import { ReduxConstants } from 'src/enumConstants'

export class GenericReducers {
    static dataListReducer = (state = { data: [], loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.LIST_REQUEST:
                return { loading: true, data: [] }
            case ReduxConstants.LIST_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.LIST_FAIL:
                return { loading: false, error: action.payload, data: [] }
            case ReduxConstants.LIST_RESET:
                return { loading: false, data: [] }
            default:
                return state
        }
    }

    static dataCreateReducer = (state = { loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.CREATE_REQUEST:
                return { loading: true }
            case ReduxConstants.CREATE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.CREATE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.CREATE_RESET:
                return { loading: false }
            default:
                return state
        }
    }

    static dataDetailsReducer = (state = { loadng: false, data: {} }, action) => {
        switch (action.type) {
            case ReduxConstants.DETAILS_REQUEST:
                return { loading: true, data: {} }
            case ReduxConstants.DETAILS_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.DETAILS_FAIL:
                return { loading: false, error: action.payload, data: {} }
            case ReduxConstants.DETAILS_RESET:
                return { loading: false, data: {} }
            default:
                return state
        }
    }

    static dataUpdateReducer = (state = { loadng: false }, action) => {
        switch (action.type) {
            case ReduxConstants.UPDATE_REQUEST:
                return { loading: true }
            case ReduxConstants.UPDATE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.UPDATE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.UPDATE_RESET:
                return { loading: false }
            default:
                return state
        }
    }

    static dataDeleteReducer = (state = { loadng: false }, action) => {
        switch (action.type) {
            case ReduxConstants.DELETE_REQUEST:
                return { loading: true }
            case ReduxConstants.DELETE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.DELETE_FAIL:
                return { loading: false, error: action.payload }
            case ReduxConstants.DELETE_RESET:
                return { loading: false }
            default:
                return state
        }
    }
}
