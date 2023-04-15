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

    const { loading, data: createdPlatformReview, error } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (error) toast.error(error)
        if (createdPlatformReview.platformReviewId) {
            toast.success(`Platform review ID ${createdPlatformReview.platformReviewId} created successfully`)
            window.location.reload()
        }
    }, [createdPlatformReview, error])

    const fields = [
        { key: 'comment', label: 'Comment', required: true },
        { key: 'rating', label: 'Rating', required: true }
    ]

    const submitHandler = (data) => {
        data.platformId = platformId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review`, data))
    }

    return <FormComponent loading={loading} msg={['Create a new platform Review', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformReviewUpdateForm = ({ platformReview }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedPlatformReview, error } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (error) toast.error(error)
        if (updatedPlatformReview.platformReviewId) {
            toast.success(`Platform review ID ${updatedPlatformReview.platformReviewId} updated successfully`)
            window.location.reload()
        }
    }, [updatedPlatformReview, error])

    const fields = [
        { key: 'comment', label: 'Comment', required: true, default: platformReview.comment },
        { key: 'rating', label: 'Rating', required: true, default: platformReview.rating }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review/${platformReview.platformReviewId}`, data))
    }

    return (
        <FormComponent
            loading={loading}
            msg={[`Update platform review ${platformReview.platformReviewId}`, 'Update']}
            fields={fields}
            submitHandler={submitHandler}
        />
    )
}

export const PlatformReviewDeleteForm = ({ platformReview }) => {
    const dispatch = useDispatch()

    const { loading, data: deletedPlatformReview, error } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (error) toast.error(error)
        if (deletedPlatformReview) {
            toast.success(`Platform review ID ${deletedPlatformReview.platformReviewId} deleted successfully`)
            window.location.reload()
        }
    }, [deletedPlatformReview, error])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review/${platformReview.platformReviewId}`))
    }

    return (
        <FormComponent loading={loading} msg={[`Delete platform review ${platformReview.platformReviewId}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
    )
}

export const PlatformReviewList = ({ platform, create, action }) => {
    const dispatch = useDispatch()

    const { loading, data: platformReviews, error } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/review`, { platformId: platform?.platformId }))
    }, [dispatch])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

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
            loading={loading}
            data={platformReviews.map((platformReview) => ({
                ...platformReview,
                key: platformReview.platformReviewId,
                updateForm: action && <PlatformReviewUpdateForm platformReview={platformReview} />,
                deleteForm: action && <PlatformReviewDeleteForm platformReview={platformReview} />
            }))}
            fields={fields}
            msg={[platform ? `Reviews for platform ${platform.name}` : 'All platform reviews by you']}
            createForm={platform && create && <PlatformReviewCreateForm platformId={platform.platformId} />}
        />
    )
}
