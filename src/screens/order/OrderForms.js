import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FormComponent } from 'src/components2/FormComponent'
import { AddressKeys, PaymentMethod, RouteConstants } from 'src/enumConstants'
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
        data.platformId = platformId
        data.cartProducts = cartProducts
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Update shipping address and payment method', 'Save']} fields={fields} submitHandler={submitHandler} />
}
