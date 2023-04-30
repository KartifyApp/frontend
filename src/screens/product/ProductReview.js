import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { GenericActions } from 'src/reduxManager/genericActions'
import { FormComponent } from 'src/components/FormComponent'
import { TableComponent } from 'src/components/TableComponent'
import { RouteConstants } from 'src/constants/enumConstants'

export const ProductReviewCreateForm = ({ productId }) => {
    const dispatch = useDispatch()

    const { loading, data: createdProductReview } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (createdProductReview.productReviewId) {
            toast.success(`Product review ID ${createdProductReview.productReviewId} created successfully`)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES, { productId }))
        }
    }, [createdProductReview, dispatch, productId])

    const fields = [
        { key: 'comment', label: 'Comment', required: true },
        { key: 'rating', label: 'Rating', required: true }
    ]

    const submitHandler = (data) => {
        data.productId = productId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Create a new product Review', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const ProductReviewUpdateForm = ({ productReview }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedProductReview } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (updatedProductReview.productReviewId) {
            toast.success(`Product review ID ${updatedProductReview.productReviewId} updated successfully`)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES))
        }
    }, [updatedProductReview, dispatch])

    const fields = [
        { key: 'comment', label: 'Comment', required: true, default: productReview.comment },
        { key: 'rating', label: 'Rating', required: true, default: productReview.rating }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES + `/${productReview.productReviewId}`, data))
    }

    return (
        <FormComponent
            loading={loading}
            msg={[`Update product review ${productReview.productReviewId}`, 'Update']}
            fields={fields}
            submitHandler={submitHandler}
        />
    )
}

export const ProductReviewDeleteForm = ({ productReview }) => {
    const dispatch = useDispatch()

    const { loading, data: deletedProductReview } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (deletedProductReview.productReviewId) {
            toast.success(`Review ${deletedProductReview.productReviewId} deleted successfully`)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES))
        }
    }, [deletedProductReview, dispatch])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES + `/${productReview.productReviewId}`))
    }

    return <FormComponent loading={loading} msg={[`Delete product review ${productReview.productReviewId}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}

export const ProductReviewList = ({ product, action, create }) => {
    const dispatch = useDispatch()

    const { loading, data: productReviews } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_REVIEW_ROUTES, { productId: product?.productId }))
    }, [product, dispatch])

    const fields = [
        { key: 'productReviewId', label: 'Review ID' },
        { key: 'comment', label: 'Comment' },
        { key: 'rating', label: 'Rating' },
        { key: 'userId', label: 'User ID' },
        { key: 'productId', label: 'Product ID' },
        action && { key: 'actions', label: 'Actions' }
    ]
    return (
        <TableComponent
            loading={loading}
            data={productReviews.map((productReview) => ({
                ...productReview,
                key: productReview.productReviewId,
                updateForm: <ProductReviewUpdateForm productReview={productReview} />,
                deleteForm: <ProductReviewDeleteForm productReview={productReview} />
            }))}
            fields={fields}
            msg={[product ? `Reviews for product ${product.name}` : 'All product reviews by you']}
            createForm={product && create && <ProductReviewCreateForm productId={product.productId} />}
        />
    )
}
