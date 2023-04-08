export const RouteConstants = Object.freeze({
    BASE_URL: 'http://localhost:5000',
    AUTH_PATH: '/auth',
    USER_ROUTES: '/api/user',
    PLATFORM_ROUTES: '/api/platform',
    PRODUCT_ROUTES: '/api/product'
})

export const UserType = Object.freeze({
    ADMIN: 'ADMIN',
    PROVIDER: 'PROVIDER',
    CONSUMER: 'CONSUMER',
    DELIVERY: 'DELIVERY'
})

export const ReducerNames = Object.freeze({
    USER_LOGIN: 'userLogin',
    USER_REGISTER: 'userRegister',
    PLATFORM_LIST: 'platformList'
})
