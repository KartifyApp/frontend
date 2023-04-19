import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import { FormComponent } from 'src/components/FormComponent'
import { RouteConstants } from 'src/constants/enumConstants'

export const ProductCreateForm = ({ platformId }) => {
    const dispatch = useDispatch()

    const { loading, data: createdProduct, error } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (error) toast.error(error)
        if (createdProduct.name) {
            toast.success(`${createdProduct.name} created successfully`)
            window.location.reload()
        }
    }, [createdProduct, error])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'brand', label: 'Brand', required: true },
        { key: 'category', label: 'Category', required: true },
        { key: 'image', label: 'Image' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price', default: '0.00' },
        { key: 'stockCount', label: 'Stock Count', default: 1 }
    ]

    const submitHandler = (data) => {
        data.platformId = platformId
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Create a new product', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const ProductUpdateForm = ({ product }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedProduct, error } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (error) toast.error(error)
        if (updatedProduct.productId) {
            toast.success(`Product ID ${updatedProduct.productId} updated successfully`)
            window.location.reload()
        }
    }, [updatedProduct, error])

    const fields = [
        { key: 'name', label: 'Name', required: true, default: product.name },
        { key: 'image', label: 'image', default: product.image },
        { key: 'brand', label: 'brand', required: true, default: product.brand },
        { key: 'category', label: 'category', required: true, default: product.category },
        { key: 'description', label: 'description', default: product.description },
        { key: 'price', label: 'price', default: product.price },
        { key: 'stockCount', label: 'stockCount', default: product.stockCount }
    ]

    const submitHandler = (data) => {
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`, data))
    }

    return <FormComponent loading={loading} msg={[`Update product ${product.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const ProductDeleteForm = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, data: deletedProduct, error } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (error) toast.error(error)
        if (deletedProduct.productId) {
            toast.success(`Product ID ${deletedProduct.productId} deleted successfully`)
            navigate(-1)
        }
    }, [deletedProduct, error, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`))
    }

    return <FormComponent loading={loading} msg={[`Delete product ${product.name}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}
