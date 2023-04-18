import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'

import SidebarLayout from 'src/layouts/SidebarLayout'
import BaseLayout from 'src/layouts/BaseLayout'

import SuspenseLoader from 'src/components/SuspenseLoader'

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    )

const UserAuthScreen = Loader(lazy(() => import('src/screens/user/UserAuthScreen')))
const UserDetailsScreen = Loader(lazy(() => import('src/screens/user/UserDetailsScreen')))
const PlatformGridScreen = Loader(lazy(() => import('src/screens/platform/PlatformGridScreen')))
const ProductGridScreen = Loader(lazy(() => import('src/screens/product/ProductGridScreen')))
const PlatformDetailsScreen = Loader(lazy(() => import('src/screens/platform/PlatformDetailsScreen')))
const ProductDetailsScreen = Loader(lazy(() => import('src/screens/product/ProductDetailsScreen')))
const CartTableScreen = Loader(lazy(() => import('src/screens/order/CartTableScreen')))
const OrdersScreen = Loader(lazy(() => import('src/screens/order/OrdersScreen')))
const OrderDetailsScreen = Loader(lazy(() => import('src/screens/order/OrderDetailsScreen')))
const DeliveryUsersScreen = Loader(lazy(() => import('src/screens/user/DeliveryUsersScreen')))
const DeliveryJobsScreen = Loader(lazy(() => import('src/screens/user/DeliveryJobsScreen')))

const routes = [
    {
        path: '',
        element: <BaseLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="/platform" replace />
            },
            {
                path: '/auth',
                element: <UserAuthScreen />
            }
        ]
    },
    {
        path: 'user',
        element: <SidebarLayout />,
        children: [
            {
                path: 'profile',
                element: <UserDetailsScreen />
            },
            {
                path: 'delivery',
                element: <DeliveryUsersScreen />
            },
            {
                path: 'delivery-job',
                element: <DeliveryJobsScreen />
            }
        ]
    },
    {
        path: 'platform',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <PlatformGridScreen />
            },
            {
                path: ':platformId',
                children: [
                    {
                        path: '',
                        element: <PlatformDetailsScreen />
                    }
                ]
            }
        ]
    },
    {
        path: 'product',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <ProductGridScreen />
            },
            {
                path: ':productId',
                element: <ProductDetailsScreen />
            }
        ]
    },
    {
        path: 'order',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <OrdersScreen />
            },
            {
                path: ':orderId',
                element: <OrderDetailsScreen />
            },
            {
                path: 'cart',
                element: <CartTableScreen />
            }
        ]
    }
]

export default routes
