import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ProductActions } from 'src/actions/productActions'
import GridComponent from 'src/components2/GridComponent'

const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        state: { platform }
    } = useLocation()

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, error, products } = useSelector((state) => state.productList)

    useEffect(() => {
        if (!platform) navigate('/platform')
        if (error) toast.error(error)
        if (!userInfo || !userInfo.token) navigate('/auth')
        dispatch(ProductActions.getProducts({ platformId: platform.platformId }))
    }, [userInfo])

    return (
        <GridComponent
            msg={['Products', `Products for the platform with platformId ${platform.name}`, 'Products']}
            loading={loading}
            data={products.map((product) => ({
                id: product.productId,
                name: [product.name, product.brand, product.category].join('\xa0'.repeat(5)),
                description: product.description,
                buttons: [{ name: 'Info' }, { name: 'Reviews' }]
            }))}
        />
    )
}

export default ProductList
