import { ReduxConstants } from 'src/enumConstants'

export class GenericReducers {
    static dataListReducer = (state = { data: [], loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.LIST_REQUEST:
                return { loading: true }
            case ReduxConstants.LIST_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.LIST_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state
        }
    }

    static dataCreateReducer = (state = { data: {}, loading: false }, action) => {
        switch (action.type) {
            case ReduxConstants.CREATE_REQUEST:
                return { loading: true }
            case ReduxConstants.CREATE_SUCCESS:
                return { loading: false, data: action.payload }
            case ReduxConstants.CREATE_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state
        }
    }
}
