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

export const ReduxConstants = Object.freeze({
    LIST_REQUEST: 'LIST_REQUEST',
    LIST_SUCCESS: 'LIST_SUCCESS',
    LIST_FAIL: 'LIST_FAIL',
    CREATE_REQUEST: 'CREATE_REQUEST',
    CREATE_SUCCESS: 'CREATE_SUCCESS',
    CREATE_FAIL: 'CREATE_FAIL'
})
