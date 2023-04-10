import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { TableComponent } from 'src/components2/TableComponent'
import { RouteConstants, UserType } from 'src/enumConstants'

export const ProductReviewCreateForm = ({ productId }) => {
    const dispatch = useDispatch()

    const productReviewCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (productReviewCreate.error) toast.error(productReviewCreate.error)
        if (productReviewCreate.data) {
            toast.success(`Review ${productReviewCreate.data.productReviewId} created successfully`)
            window.location.reload()
        }
    }, [productReviewCreate])

    const fields = [
        { key: 'comment', label: 'Comment', required: true },
        { key: 'rating', label: 'Rating', required: true }
    ]

    const submitHandler = (data) => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${productId}/review`, data))
    }

    return <FormComponent loading={productReviewCreate.loading} msg={['Create a new product Review', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const ProductReviewUpdateForm = ({ productReview }) => {
    const dispatch = useDispatch()

    const productReviewUpdate = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (productReviewUpdate.error) toast.error(productReviewUpdate.error)
        if (productReviewUpdate.data) {
            toast.success(`Review ${productReviewUpdate.data.productReviewId} updated successfully`)
            window.location.reload()
        }
    }, [productReviewUpdate])

    const fields = [
        { key: 'comment', label: 'Comment', required: true, default: productReview.comment },
        { key: 'rating', label: 'Rating', required: true, default: productReview.rating }
    ]

    const submitHandler = (data) => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        dispatch(
            GenericActions.updateData(
                RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${productReview.productId}/review/${productReview.productReviewId}`,
                data
            )
        )
    }

    return <FormComponent loading={productReviewUpdate.loading} msg={['Update product Review', 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const ProductReviewDeleteForm = ({ productReview }) => {
    const dispatch = useDispatch()

    const productReviewDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (productReviewDelete.error) toast.error(productReviewDelete.error)
        if (productReviewDelete.data) {
            toast.success(`Review ${productReviewDelete.data.productReviewId} deleted successfully`)
            window.location.reload()
        }
    }, [productReviewDelete])

    const deleteHandler = () => {
        dispatch(
            GenericActions.deleteData(
                RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${productReview.productId}/review/${productReview.productReviewId}`
            )
        )
    }

    return (
        <FormComponent
            loading={productReviewDelete.loading}
            msg={[`Delete product review ${productReview.productReviewId}`, 'OK']}
            fields={[]}
            submitHandler={deleteHandler}
        />
    )
}

export const ProductReviewList = ({ product }) => {
    const dispatch = useDispatch()

    const productReviewList = useSelector((state) => state.dataList)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}/review`))
    }, [product, dispatch])

    const fields = [
        { key: 'productReviewId', label: 'Review ID' },
        { key: 'comment', label: 'Comment' },
        { key: 'rating', label: 'Rating' },
        { key: 'userId', label: 'User ID' },
        { key: 'productId', label: 'Product ID' },
        userInfo.userType == UserType.CONSUMER && { key: 'actions', label: 'Actions' }
    ]
    return (
        <TableComponent
            loading={productReviewList.loading}
            data={productReviewList.data?.map((productReview) => ({
                ...productReview,
                key: productReview.productReviewId,
                updateForm: <ProductReviewUpdateForm productReview={productReview} />,
                deleteForm: <ProductReviewDeleteForm productReview={productReview} />
            }))}
            fields={fields}
            msg={[`Reviews for product ${product.name}`]}
            createForm={userInfo.userType === UserType.CONSUMER ? <ProductReviewCreateForm productId={product.productId} /> : null}
        />
    )
}