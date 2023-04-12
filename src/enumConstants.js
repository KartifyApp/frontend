export const RouteConstants = Object.freeze({
    BASE_URL: 'http://localhost:5000',
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

export const PlatformStatus = Object.freeze({
    LIST_ITEMS: 'LIST_ITEMS',
    DELIVERY: 'DELIVERY',
    PAYMENT_GATEWAY: 'PAYMENT_GATEWAY',
    DOWNTIME: 'DOWNTIME'
})

export const AddressKeys = ['postOffice', 'pinCode', 'city', 'country', 'phoneNumber']

export const STATE_RESET_TIME = 3000

export const ReduxConstants = Object.freeze({
    LIST_REQUEST: 'LIST_REQUEST',
    LIST_SUCCESS: 'LIST_SUCCESS',
    LIST_FAIL: 'LIST_FAIL',
    LIST_RESET: 'LIST_RESET',
    CREATE_REQUEST: 'CREATE_REQUEST',
    CREATE_SUCCESS: 'CREATE_SUCCESS',
    CREATE_FAIL: 'CREATE_FAIL',
    CREATE_RESET: 'CREATE_RESET',
    DETAILS_REQUEST: 'DETAILS_REQUEST',
    DETAILS_SUCCESS: 'DETAILS_SUCCESS',
    DETAILS_FAIL: 'DETAILS_FAIL',
    DETAILS_RESET: 'DETAILS_RESET',
    UPDATE_REQUEST: 'UPDATE_REQUEST',
    UPDATE_SUCCESS: 'UPDATE_SUCCESS',
    UPDATE_FAIL: 'UPDATE_FAIL',
    UPDATE_RESET: 'UPDATE_RESET',
    DELETE_REQUEST: 'DELETE_REQUEST',
    DELETE_SUCCESS: 'DELETE_SUCCESS',
    DELETE_FAIL: 'DELETE_FAIL',
    DELETE_RESET: 'DELETE_RESET'
})

export const UserConstants = Object.freeze({
    USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    USER_LOGOUT: 'USER_LOGOUT'
})
