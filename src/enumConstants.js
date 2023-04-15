export const RouteConstants = Object.freeze({
    BASE_URL: 'http://localhost:5000',
    USER_ROUTES: '/api/user',
    PLATFORM_ROUTES: '/api/platform',
    PRODUCT_ROUTES: '/api/product',
    ORDER_ROUTES: '/api/order',
    DELIVERY_JOB: '/api/delivery-job'
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

export const DeliveryStatus = Object.freeze({
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    WORKING: 'WORKING'
})

export const PaymentMethod = Object.freeze({
    CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
    ONLINE_TRANSACTION: 'ONLINE_TRANSACTION'
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

export const CartConstants = Object.freeze({
    CART_UPDATE_PRODUCTS: 'CART_UPDATE_PRODUCT',
    CART_UPDATE_FAIL: 'CART_UPDATE_FAIL',
    CART_ERROR_RESET: 'CART_ERROR_RESET',
    CART_SAVE_SHIPPING_ADDRESS: 'CART_SAVE_SHIPPING_ADDRESS',
    CART_SAVE_PAYMENT_METHOD: 'CART_SAVE_PAYMENT_METHOD'
})
