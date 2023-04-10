import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { RouteConstants } from 'src/enumConstants'

export const ProductCreateForm = ({ platformId }) => {
    const dispatch = useDispatch()

    const productCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (productCreate.error) toast.error(productCreate.error)
        if (productCreate.data) {
            toast.success(`${productCreate.data.name} created successfully`)
            window.location.reload()
        }
    }, [productCreate])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'brand', label: 'Brand', required: true },
        { key: 'category', label: 'Category', required: true },
        { key: 'platformId', label: 'Platform Id', default: platformId, required: true },
        { key: 'image', label: 'Image' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price', default: '0.00' },
        { key: 'stockCount', label: 'Stock Count', default: 1 }
    ]

    const submitHandler = (data) => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, data))
    }

    return <FormComponent loading={productCreate.loading} msg={['Create a new product', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const ProductUpdateForm = ({ product }) => {
    const dispatch = useDispatch()

    const productUpdate = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (productUpdate.error) toast.error(productUpdate.error)
        if (productUpdate.data) {
            toast.success(`Product ID ${productUpdate.data.productId} updated successfully`)
            window.location.reload()
        }
    }, [productUpdate, product])

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
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`, data))
    }

    return <FormComponent loading={productUpdate.loading} msg={[`Update product ${product.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const ProductDeleteForm = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (productDelete.error) toast.error(productDelete.error)
        if (productDelete.data) {
            toast.success(`Product ID ${productDelete.data.productId} deleted successfully`)
            navigate(-1)
        }
    }, [productDelete, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`))
    }

    return <FormComponent loading={productDelete.loading} msg={[`Delete product ${product.name}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}
