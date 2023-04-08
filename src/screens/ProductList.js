import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ProductActions } from 'src/actions/productActions'
import FormComponent from 'src/components2/FormComponent'
import GridComponent from 'src/components2/GridComponent'

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        state: { platform }
    } = useLocation()

    const { userInfo } = useSelector((state) => state.userLogin)
    const productList = useSelector((state) => state.productList)
    const productCreate = useSelector((state) => state.productCreate)

    useEffect(() => {
        if (!platform) navigate('/platform')
        if (!userInfo || !userInfo.token) navigate('/auth')
        if (productCreate.error) toast.error(productCreate.error)
        if (productCreate.product) toast.success(`${productCreate.product.name} created successfully`)
        if (!productCreate.loading) dispatch(ProductActions.getProducts({ platformId: platform.platformId }))
    }, [userInfo, productCreate, platform, dispatch, navigate])

    const createForm = (
        <FormComponent
            loading={productCreate.loading}
            msg={['Create a new product', 'Submit']}
            fields={[
                { key: 'name', label: 'Name', required: true },
                { key: 'brand', label: 'Brand', required: true },
                { key: 'category', label: 'Category', required: true },
                { key: 'platformId', label: 'Platform Id', default: platform.platformId, required: true },
                { key: 'image', label: 'Image' },
                { key: 'description', label: 'Description' },
                { key: 'price', label: 'Price', default: 0 },
                { key: 'stockCount', label: 'Stock Count', default: 0 }
            ]}
            submitAction={ProductActions.createProduct}
        />
    )

    return (
        <GridComponent
            msg={['Products', `Products for  platform '${platform.name}'`, 'Products']}
            loading={productList.loading}
            data={productList.products.map((product) => ({
                id: product.productId,
                name: [product.name, product.brand, product.category].join('\xa0'.repeat(5)),
                description: product.description,
                category: product.category,
                buttons: [{ name: 'Info' }, { name: 'Reviews' }]
            }))}
            filter={{
                key: 'category',
                menu: platform.categories
            }}
            createForm={createForm}
        />
    )
}

export default ProductList
