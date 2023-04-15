import { Dialog } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormComponent from 'src/components2/FormComponent'
import { PaymentMethod, RouteConstants } from 'src/enumConstants'
import { CartActions } from 'src/reduxManager/cartActions'
import { GenericActions } from 'src/reduxManager/genericActions'

export const OrderCreateForm = ({ open, setOpen }) => {
    const dispatch = useDispatch()

    const { shippingAddress, paymentMethod, cartProducts, platformId } = useSelector((state) => state.cartDetails)
    const orderCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (orderCreate.error) toast.error(orderCreate.error)
        if (orderCreate.data) {
            toast.success(`Order ${orderCreate.data.platformReviewId} created successfully`)
            dispatch(CartActions.clearCart())
            window.location.reload()
        }
    }, [orderCreate])

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
        dispatch(
            GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES, {
                shippingAddress,
                paymentMethod: data.paymentMethod,
                platformId,
                cartProducts
            })
        )
    }

    return (
        <>
            <Dialog onClose={(e) => setOpen(false)} open={open}>
                <FormComponent loading={false} msg={['Update shipping address', 'Save']} fields={fields} submitHandler={submitHandler} />
            </Dialog>
        </>
    )
}
