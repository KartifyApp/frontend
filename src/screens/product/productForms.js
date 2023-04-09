import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
