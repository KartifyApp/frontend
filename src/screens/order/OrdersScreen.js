import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Footer } from 'src/components2/Footer'
import { Header } from 'src/components2/Header'
import { TableComponent } from 'src/components2/TableComponent'
import { OrderStatus, RouteConstants, UserType } from 'src/enumConstants'
import { GenericActions } from 'src/reduxManager/genericActions'
import { OrderDeliveryJobForm } from './OrderForms'

const OrdersScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const platformId = useSearchParams()[0].get('platformId')

    const { loading, data: orders, error } = useSelector((state) => state.dataList)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(
            GenericActions.getDataList(
                RouteConstants.BASE_URL + (platformId ? RouteConstants.PLATFORM_ROUTES + `/${platformId}/order` : RouteConstants.ORDER_ROUTES)
            )
        )
    }, [platformId, userInfo, dispatch, navigate])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const fields = [
        { key: 'orderId', label: 'Order ID' },
        { key: 'totalPrice', label: 'Total Price' },
        { key: 'orderStatus', label: 'Order Status' },
        { key: 'paymentStatus', label: 'Payment Status' },
        { key: 'userId', label: 'User ID' },
        { key: 'platformId', label: 'Platform ID' },
        { key: 'deliveryJobId', label: 'Job ID' },
        userInfo.userType === UserType.DELIVERY && platformId && { key: 'create', label: 'Deliver' }
    ]

    return (
        <>
            <Header msg={['Orders', `Orders ${platformId ? `for platform ID ${platformId}` : ''}`, 'Manage Orders']} />
            <Container maxWidth="lg">
                <TableComponent
                    loading={loading}
                    data={orders.map((order) => ({
                        ...order,
                        key: order.orderId,
                        onClick: (e) => navigate(`/order/${order.orderId}`),
                        createForm: <OrderDeliveryJobForm order={order} />
                    }))}
                    fields={fields}
                    msg={[`Update or delete delivery jobs`]}
                    filter={{
                        label: 'Status',
                        key: 'orderStatus',
                        menu: Object.keys(OrderStatus)
                    }}
                />
            </Container>
            <Footer />
        </>
    )
}

export default OrdersScreen
