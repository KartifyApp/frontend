import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { DeliveryStatus, RouteConstants, UserType } from 'src/enumConstants'

export const DeliveryJobCreateForm = ({ userId }) => {
    const dispatch = useDispatch()

    const deliveryJobCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (deliveryJobCreate.error) toast.error(deliveryJobCreate.error)
        if (deliveryJobCreate.data) {
            toast.success(`Delivery Job ID ${deliveryJobCreate.data.deliveryJobId} created successfully`)
            window.location.reload()
        }
    }, [deliveryJobCreate])

    const fields = [
        { key: 'salary', label: 'Salary', required: true },
        { key: 'platformId', label: 'Platform ID', required: true }
    ]

    const submitHandler = (data) => {
        data.userId = userId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB, data))
    }

    return <FormComponent loading={deliveryJobCreate.loading} msg={['Create a new delivery job', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const DeliveryJobUpdateForm = ({ deliveryJob }) => {
    const dispatch = useDispatch()

    const deliveryJobUpdate = useSelector((state) => state.dataUpdate)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (deliveryJobUpdate.error) toast.error(deliveryJobUpdate.error)
        if (deliveryJobUpdate.data) {
            toast.success(`Delivery Job ID ${deliveryJobUpdate.data.productId} updated successfully`)
            window.location.reload()
        }
    }, [deliveryJobUpdate, deliveryJob])

    const fields = [
        userInfo.userType === UserType.PROVIDER && { key: 'salary', label: 'Salary', required: true, default: deliveryJob.salary },
        userInfo.userType === UserType.DELIVERY && {
            key: 'deliveryStatus',
            label: 'Delivery Status',
            required: true,
            dropdown: true,
            menu: Object.keys(DeliveryStatus),
            default: deliveryJob.deliveryStatus
        }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB + `/${deliveryJob.deliveryJobId}`, data))
    }

    return (
        <FormComponent
            loading={deliveryJobUpdate.loading}
            msg={[`Update delivery job ${deliveryJob.deliveryJobId}`, 'Update']}
            fields={fields}
            submitHandler={submitHandler}
        />
    )
}

export const DeliveryJobDeleteForm = ({ deliveryJob }) => {
    const dispatch = useDispatch()

    const deliveryJobDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (deliveryJobDelete.error) toast.error(deliveryJobDelete.error)
        if (deliveryJobDelete.data) {
            toast.success(`Delivery job ${deliveryJobDelete.data.productReviewId} deleted successfully`)
            window.location.reload()
        }
    }, [deliveryJobDelete])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB + `/${deliveryJob.deliveryJobId}`))
    }

    return (
        <FormComponent
            loading={deliveryJobDelete.loading}
            msg={[`Delete delivery job ${deliveryJob.deliveryJobId}`, 'OK']}
            fields={[]}
            submitHandler={deleteHandler}
        />
    )
}
