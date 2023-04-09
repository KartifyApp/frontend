import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import GridComponent from 'src/components2/GridComponent'
import { RouteConstants } from 'src/enumConstants'

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        state: { platform }
    } = useLocation()

    const { userInfo } = useSelector((state) => state.userLogin)
    const productList = useSelector((state) => state.dataList)
    const productCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (!platform) navigate('/platform')
        if (!userInfo || !userInfo.token) navigate('/auth')
        if (productCreate.error) {
            toast.error(productCreate.error)
            delete productCreate.error
        }
        if (productCreate.data) {
            toast.success(`${productCreate.data.name} created successfully`)
            delete productCreate.data
        }
        if (!productCreate.loading)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
    }, [userInfo, productCreate.loading, platform, dispatch, navigate])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'brand', label: 'Brand', required: true },
        { key: 'category', label: 'Category', required: true },
        { key: 'platformId', label: 'Platform Id', default: platform.platformId, required: true },
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

    return (
        <GridComponent
            msg={['Products', `Products for  platform '${platform.name}'`, 'Products']}
            loading={productList.loading}
            data={productList.data?.map((product) => ({
                id: product.productId,
                name: [product.name, product.brand, product.category].join('\xa0'.repeat(5)),
                description: product.description,
                category: product.category,
                buttons: [{ name: 'Info' }]
            }))}
            filter={{
                key: 'category',
                menu: platform.categories
            }}
            createForm={
                <FormComponent loading={productCreate.loading} msg={['Create a new product', 'Submit']} fields={fields} submitHandler={submitHandler} />
            }
        />
    )
}

export default ProductList
