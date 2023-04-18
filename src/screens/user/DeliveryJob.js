import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import { FormComponent } from 'src/components/FormComponent'
import { DeliveryStatus, RouteConstants, UserType } from 'src/enumConstants'
import { TableComponent } from 'src/components/TableComponent'
import { useNavigate } from 'react-router'

export const DeliveryJobCreateForm = ({ userId }) => {
    const dispatch = useDispatch()

    const { loading, data: createdDeliveryJob, error } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (error) toast.error(error)
        if (createdDeliveryJob.deliveryJobId) {
            toast.success(`Delivery Job ID ${createdDeliveryJob.deliveryJobId} created successfully`)
            window.location.reload()
        }
    }, [createdDeliveryJob, error])

    const fields = [
        { key: 'salary', label: 'Salary', required: true },
        { key: 'platformId', label: 'Platform ID', required: true }
    ]

    const submitHandler = (data) => {
        data.userId = userId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB, data))
    }

    return <FormComponent loading={loading} msg={['Create a new delivery job', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const DeliveryJobUpdateForm = ({ deliveryJob }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedDeliveryJob, error } = useSelector((state) => state.dataUpdate)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (error) toast.error(error)
        if (updatedDeliveryJob.deliveryJobId) {
            toast.success(`Delivery Job ID ${updatedDeliveryJob.productId} updated successfully`)
            window.location.reload()
        }
    }, [updatedDeliveryJob, error])

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
        <FormComponent loading={loading} msg={[`Update delivery job ${deliveryJob.deliveryJobId}`, 'Update']} fields={fields} submitHandler={submitHandler} />
    )
}

export const DeliveryJobDeleteForm = ({ deliveryJob }) => {
    const dispatch = useDispatch()

    const { loading, data: deletedDeliveryJob, error } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (error) toast.error(error)
        if (deletedDeliveryJob.deliveryJobId) {
            toast.success(`Delivery job ${deletedDeliveryJob.productReviewId} deleted successfully`)
            window.location.reload()
        }
    }, [deletedDeliveryJob, error])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB + `/${deliveryJob.deliveryJobId}`))
    }

    return <FormComponent loading={loading} msg={[`Delete delivery job ${deliveryJob.deliveryJobId}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}

export const DeliveryJobList = ({ platform }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, data: deliveryJobs, error } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB, { platformId: platform?.platformId }))
    }, [platform, dispatch])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const fields = [
        { key: 'deliveryJobId', label: 'Job ID' },
        { key: 'salary', label: 'Salary' },
        { key: 'deliveryStatus', label: 'Status' },
        { key: 'userId', label: 'User ID' },
        { key: 'platformId', label: 'Platform ID' },
        { key: 'actions', label: 'Actions' }
    ]
    return (
        <TableComponent
            loading={loading}
            data={deliveryJobs.map((deliveryJob) => ({
                ...deliveryJob,
                key: deliveryJob.deliveryJobId,
                onClick: (e) => navigate(`/platform/${deliveryJob.platformId}`),
                updateForm: <DeliveryJobUpdateForm deliveryJob={deliveryJob} />,
                deleteForm: <DeliveryJobDeleteForm deliveryJob={deliveryJob} />
            }))}
            fields={fields}
            msg={[`Update or delete delivery jobs`]}
        />
    )
}
