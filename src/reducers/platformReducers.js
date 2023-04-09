import { PlatformConstants } from 'src/reduxConstants'

export class PlatformReducers {
    static platformListReducer = (state = { platforms: [], loading: false }, action) => {
        switch (action.type) {
            case PlatformConstants.PLATFORM_LIST_REQUEST:
                return { loading: true, platforms: [] }
            case PlatformConstants.PLATFORM_LIST_SUCCESS:
                return { loading: false, platforms: action.payload }
            case PlatformConstants.PLATFORM_LIST_FAIL:
                return { loading: false, error: action.payload, platforms: [] }
            default:
                return state
        }
    }

    static platformCreateReducer = (state = {}, action) => {
        switch (action.type) {
            case PlatformConstants.PLATFORM_CREATE_REQUEST:
                return { loading: true }
            case PlatformConstants.PLATFORM_CREATE_SUCCESS:
                return { loading: false, platform: action.payload }
            case PlatformConstants.PLATFORM_CREATE_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state
        }
    }
}
