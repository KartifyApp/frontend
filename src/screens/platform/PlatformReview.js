import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { TableComponent } from 'src/components2/TableComponent'
import { RouteConstants } from 'src/enumConstants'

export const PlatformReviewCreateForm = ({ platformId }) => {
    const dispatch = useDispatch()

    const platformReviewCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (platformReviewCreate.error) toast.error(platformReviewCreate.error)
        if (platformReviewCreate.data) {
            toast.success(`Review ${platformReviewCreate.data.platformReviewId} created successfully`)
            window.location.reload()
        }
    }, [platformReviewCreate])

    const fields = [
        { key: 'comment', label: 'Comment', required: true },
        { key: 'rating', label: 'Rating', required: true }
    ]

    const submitHandler = (data) => {
        data.platformId = platformId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review`, data))
    }

    return (
        <FormComponent loading={platformReviewCreate.loading} msg={['Create a new platform Review', 'Submit']} fields={fields} submitHandler={submitHandler} />
    )
}

export const PlatformReviewUpdateForm = ({ platformReview }) => {
    const dispatch = useDispatch()

    const platformReviewUpdate = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (platformReviewUpdate.error) toast.error(platformReviewUpdate.error)
        if (platformReviewUpdate.data) {
            toast.success(`Review ${platformReviewUpdate.data.platformReviewId} updated successfully`)
            window.location.reload()
        }
    }, [platformReviewUpdate])

    const fields = [
        { key: 'comment', label: 'Comment', required: true, default: platformReview.comment },
        { key: 'rating', label: 'Rating', required: true, default: platformReview.rating }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review/${platformReview.platformReviewId}`, data))
    }

    return <FormComponent loading={platformReviewUpdate.loading} msg={['Update platform Review', 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformReviewDeleteForm = ({ platformReview }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const platformReviewDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (platformReviewDelete.error) toast.error(platformReviewDelete.error)
        if (platformReviewDelete.data) {
            toast.success(`Review ${platformReviewDelete.data.platformReviewId} deleted successfully`)
            window.location.reload()
        }
    }, [platformReviewDelete, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review/${platformReview.platformReviewId}`))
    }

    return (
        <FormComponent
            loading={platformReviewDelete.loading}
            msg={[`Delete platform review ${platformReview.platformReviewId}`, 'OK']}
            fields={[]}
            submitHandler={deleteHandler}
        />
    )
}

export const PlatformReviewList = ({ platform, create, action }) => {
    const dispatch = useDispatch()

    const platformReviewList = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(
            GenericActions.getDataList(
                RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review` + (platform ? `?platformId=${platform.platformId}` : '')
            )
        )
    }, [platform, dispatch])

    useEffect(() => {
        if (platformReviewList.error) {
            toast.error(platformReviewList.error)
        }
    }, [platformReviewList])

    const fields = [
        { key: 'platformReviewId', label: 'Review ID' },
        { key: 'comment', label: 'Comment' },
        { key: 'rating', label: 'Rating' },
        { key: 'userId', label: 'User ID' },
        { key: 'platformId', label: 'Platform ID' },
        action && { key: 'actions', label: 'Actions' }
    ]
    return (
        <TableComponent
            loading={platformReviewList.loading}
            data={platformReviewList.data?.map((platformReview) => ({
                ...platformReview,
                key: platformReview.platformReviewId,
                updateForm: action && <PlatformReviewUpdateForm platformReview={platformReview} />,
                deleteForm: action && <PlatformReviewDeleteForm platformReview={platformReview} />
            }))}
            fields={fields}
            msg={[platform ? `Reviews for platform ${platform.name}` : 'All platform reviews by you']}
            createForm={platform && create ? <PlatformReviewCreateForm platformId={platform.platformId} /> : null}
        />
    )
}
