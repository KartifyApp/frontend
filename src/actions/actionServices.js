export class ActionServices {
    static getConfig = (getState) => {
        if (!getState) return {}

        const {
            userLogin: { userInfo }
        } = getState()

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    }

    static getError = (error) => {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}
