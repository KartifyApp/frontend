import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { Header } from 'src/components2/Header'
import { Footer } from 'src/components2/Footer'
import { GenericActions } from 'src/reduxManager/genericActions'
import { OrderStatus, PaymentStatus, ReduxConstants, RouteConstants, UserType } from 'src/enumConstants'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { TableComponent } from 'src/components2/TableComponent'
import { OrderCancelForm, OrderPaymentForm, OrderUpdateForm } from './OrderForms'

export const OrderProductsTable = ({ order }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data: orderProducts, error } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${order.orderId}/product`))
    }, [order, dispatch])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const fields = [
        { key: 'productId', label: 'Product ID' },
        { key: 'name', label: 'Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' }
    ]
    return (
        <TableComponent
            loading={loading}
            data={orderProducts.map((orderProduct) => ({
                ...orderProduct,
                key: orderProduct.orderProductId,
                onClick: (e) => navigate(`/product/${orderProduct.productId}`)
            }))}
            fields={fields}
            msg={[`Products in Order ID ${order.orderId}`]}
        />
    )
}

const OrderDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { orderId } = useParams()

    const { loading, data: order, error } = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${orderId}`))
    }, [userInfo, orderId, dispatch, navigate])

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: ReduxConstants.DETAILS_RESET })
        }
    }, [error, dispatch])

    const updatePermission =
        (userInfo.userType === UserType.PROVIDER && [OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus)) ||
        (userInfo.userType === UserType.DELIVERY &&
            [OrderStatus.PICKUP, OrderStatus.SHIPPED, OrderStatus.TAKE, OrderStatus.RETURNED].includes(order.orderStatus))

    const cancelPermission =
        (userInfo.userType === UserType.PROVIDER && order.orderStatus === OrderStatus.PLACED) ||
        (userInfo.userType === UserType.CONSUMER &&
            [OrderStatus.PLACED, OrderStatus.CONFIRMED, OrderStatus.PICKUP, OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(order.orderStatus))

    const paymentPermission =
        (userInfo.userType === UserType.CONSUMER && order.paymentStatus === PaymentStatus.PAYMENT_PROCESSING) ||
        (userInfo.userType === UserType.PROVIDER && order.paymentStatus === PaymentStatus.REFUND_PROCESSING)

    const orderInfoComponent = (
        <InfoComponent
            msg={[`Order ID ${order.orderId} Details`]}
            data={[
                { key: 'Order ID', value: order.orderId },
                { key: 'Tax Price', value: order.taxPrice },
                { key: 'Shipping Price', value: order.shippingPrice },
                { key: 'Order Price', value: order.orderPrice },
                { key: 'Total Price', value: order.totalPrice },
                { key: 'Order Status', value: order.orderStatus },
                { key: 'Payment Status', value: order.paymentStatus },
                { key: 'Payment Method', value: order.paymentMethod },
                { key: 'User ID', value: order.userId },
                { key: 'Platform ID', value: order.platformId },
                { key: 'Delivery Job ID', value: order.deliveryJobId },
                {
                    key: 'Shipping Address',
                    value: [
                        { key: 'P.O.', value: order.shippingAddress?.postOffice },
                        { key: 'City', value: order.shippingAddress?.city },
                        { key: 'PIN', value: order.shippingAddress?.pinCode },
                        { key: 'Country', value: order.shippingAddress?.country },
                        { key: 'Phone', value: order.shippingAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={(updatePermission && <OrderUpdateForm order={order} />) || (paymentPermission && <OrderPaymentForm order={order} />)}
            deleteForm={cancelPermission && <OrderCancelForm order={order} />}
        />
    )

    return (
        <>
            <Header msg={[`Order Details`, `Order ID ${order.orderId}`, paymentPermission ? 'Click on update to pay' : 'Track and manage order']} />
            <Container maxWidth="lg">
                <TabsComponent
                    tabs={[
                        { value: 'orderDetails', label: 'Details', component: orderInfoComponent },
                        { value: 'orderProducts', label: 'Order Products', component: <OrderProductsTable order={order} /> }
                    ]}
                    loading={loading}
                />
            </Container>
            <Footer />
        </>
    )
}

export default OrderDetailsScreen
