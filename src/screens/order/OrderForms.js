import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FormComponent } from 'src/components2/FormComponent'
import { AddressKeys, OrderStatus, PaymentMethod, RouteConstants } from 'src/enumConstants'
import { CartActions } from 'src/reduxManager/cartActions'
import { GenericActions } from 'src/reduxManager/genericActions'

export const OrderCreateForm = () => {
    const dispatch = useDispatch()

    const { shippingAddress, paymentMethod, cartProducts, platformId } = useSelector((state) => state.cartDetails)
    const { loading, data: createdOrder, error } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (error) toast.error(error)
        if (createdOrder.orderId) {
            toast.success(`Order ID ${createdOrder.orderId} created successfully`)
            dispatch(CartActions.clearCart())
        }
    }, [createdOrder, error, dispatch])

    const fields = [
        { key: 'postOffice', label: 'Post Office', required: true, default: shippingAddress.postOffice },
        { key: 'pinCode', label: 'PIN Code', required: true, default: shippingAddress.pinCode },
        { key: 'city', label: 'City', required: true, default: shippingAddress.city },
        { key: 'country', label: 'Country', required: true, default: shippingAddress.country },
        { key: 'phoneNumber', label: 'Phone', required: true, default: shippingAddress.phoneNumber },
        { key: 'paymentMethod', label: 'Payment Method', required: true, dropdown: true, menu: Object.keys(PaymentMethod), default: paymentMethod }
    ]

    const submitHandler = (data) => {
        dispatch(CartActions.updatePaymentMethod(data.paymentMethod))
        dispatch(CartActions.updateShippingAddress(data))
        data.shippingAddress = {}
        for (var key of AddressKeys) {
            data.shippingAddress[key] = data[key]
            delete data[key]
        }
        data.cartProducts = cartProducts
        platformId && dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platformId}/order`, data))
    }

    return <FormComponent loading={loading} msg={['Update shipping address and payment method', 'Save']} fields={fields} submitHandler={submitHandler} />
}

export const OrderDeliveryJobForm = ({ order }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedOrder, error } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (error) toast.error(error)
        if (updatedOrder.orderId) {
            toast.success(`Order ID ${updatedOrder.orderId} updated successfully for delivery`)
            window.location.reload()
        }
    }, [error, updatedOrder])

    const submitHandler = (data) => {
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${order.orderId}`, {}))
    }

    return <FormComponent loading={loading} msg={[`Deliver Order ${order.orderId}`, 'OK']} fields={[]} submitHandler={submitHandler} />
}

export const OrderUpdateForm = ({ order }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedOrder, error } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (error) toast.error(error)
        if (updatedOrder.orderId) {
            toast.success(`Order ID ${updatedOrder.orderId} updated successfully`)
            window.location.reload()
        }
    }, [error, updatedOrder])

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${order.orderId}`, {}))
    }

    const nextState = {
        [OrderStatus.PLACED]: OrderStatus.CONFIRMED,
        [OrderStatus.CONFIRMED]: OrderStatus.PICKUP,
        [OrderStatus.PICKUP]: OrderStatus.SHIPPED,
        [OrderStatus.SHIPPED]: OrderStatus.DELIVERED,
        [OrderStatus.TAKE]: OrderStatus.RETURNED,
        [OrderStatus.RETURNED]: OrderStatus.RECEIVED
    }

    return (
        <FormComponent
            loading={loading}
            msg={[`Update order ID ${order.orderId} status to ${nextState[order.orderStatus]}`, 'OK']}
            fields={[]}
            submitHandler={submitHandler}
        />
    )
}

export const OrderCancelForm = ({ order }) => {
    const dispatch = useDispatch()

    const { loading, data: cancelledOrder, error } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (error) toast.error(error)
        if (cancelledOrder.orderId) {
            toast.success(`Order ID ${cancelledOrder.orderId} cancelled successfully`)
            window.location.reload()
        }
    }, [error, cancelledOrder])

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${order.orderId}/cancel`, {}))
    }

    return <FormComponent loading={loading} msg={[`Cancel order ID ${order.orderId}`, 'OK']} fields={[]} submitHandler={submitHandler} />
}

export const OrderPaymentForm = ({ order }) => {
    const dispatch = useDispatch()

    const { loading, data: paidOrder, error } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (error) toast.error(error)
        if (paidOrder.orderId) {
            toast.success(`Order ID ${paidOrder.orderId} paid successfully`)
            window.location.reload()
        }
    }, [error, paidOrder])

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${order.orderId}/pay`, {}))
    }

    return <FormComponent loading={loading} msg={[`Pay ${order.totalPrice} for order ID ${order.orderId}`, 'PAY']} fields={[]} submitHandler={submitHandler} />
}
