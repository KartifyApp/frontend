import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { TableComponent } from 'src/components/TableComponent'
import { OrderStatus, RouteConstants, UserType } from 'src/constants/enumConstants'
import { GenericActions } from 'src/reduxManager/genericActions'
import { OrderDeliveryJobForm } from './OrderForms'

const OrdersScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const platformId = useSearchParams()[0].get('platformId')

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, data: orders } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(
            GenericActions.getDataList(
                RouteConstants.BASE_URL + (platformId ? RouteConstants.PLATFORM_ROUTES + `/${platformId}/order` : RouteConstants.ORDER_ROUTES)
            )
        )
    }, [platformId, dispatch])

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
