export class ActionServices {
    static getConfig = (getState, params = null) => {
        if (!getState) return {}

        const {
            userLogin: { userInfo }
        } = getState()

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            params: params
        }
    }

    static getError = (error) => {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }

    static sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time))
    }
}
