import { PlatformConstants } from 'src/reduxConstants'

export class PlatformReducers {
    static platformsListReducer = (state = { platforms: [], loading: false }, action) => {
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
}
