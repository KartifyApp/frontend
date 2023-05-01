import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import { FormComponent } from 'src/components/FormComponent'
import { RouteConstants } from 'src/constants/enumConstants'

export const ProductCreateForm = ({ platform }) => {
    const dispatch = useDispatch()

    const { loading, data: createdProduct } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (createdProduct.name) {
            toast.success(`${createdProduct.name} created successfully`)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
        }
    }, [createdProduct, dispatch, platform])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'brand', label: 'Brand', required: true },
        { key: 'category', label: 'Category', required: true, menu: platform.categories },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price', default: '0.00' },
        { key: 'stockCount', label: 'Stock Count', default: 1 },
        { key: 'image' }
    ]

    const submitHandler = (data) => {
        data.platformId = platform.platformId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Create a new product', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const ProductUpdateForm = ({ product }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedProduct } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (updatedProduct.productId) {
            toast.success(`Product ID ${updatedProduct.productId} updated successfully`)
            dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`))
        }
    }, [updatedProduct, dispatch, product])

    const fields = [
        { key: 'name', label: 'Name', required: true, default: product.name },
        { key: 'brand', label: 'Brand', required: true, default: product.brand },
        { key: 'category', label: 'Category', required: true, default: product.category },
        { key: 'description', label: 'Description', default: product.description },
        { key: 'price', label: 'Price', default: product.price },
        { key: 'stockCount', label: 'Stock Count', default: product.stockCount },
        { key: 'image', default: product.image }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`, data))
    }

    return <FormComponent loading={loading} msg={[`Update product ${product.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const ProductDeleteForm = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, data: deletedProduct } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (deletedProduct.productId) {
            toast.success(`Product ID ${deletedProduct.productId} deleted successfully`)
            navigate(-1)
        }
    }, [deletedProduct, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`))
    }

    return <FormComponent loading={loading} msg={[`Delete product ${product.name}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}
