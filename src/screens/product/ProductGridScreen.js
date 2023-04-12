import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import GridComponent from 'src/components2/GridComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import { ProductCreateForm } from './ProductForms'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'

const ProductGridScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { state } = useLocation()
    const platform = state?.platform

    const { userInfo } = useSelector((state) => state.userLogin)
    const productList = useSelector((state) => state.dataList)

    useEffect(() => {
        if (!platform) navigate('/platform')
        if (!userInfo || !userInfo.token) navigate('/auth')
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
    }, [userInfo, platform, dispatch, navigate])

    return (
        <>
            <Header msg={['Products', `Products for  platform '${platform.name}'`]} />
            <GridComponent
                msg={['Products']}
                loading={productList.loading}
                data={productList.data?.map((product) => ({
                    id: product.productId,
                    name: [product.name, product.brand, product.category].join('\xa0'.repeat(5)),
                    description: product.description,
                    category: product.category,
                    buttons: [{ name: 'Info', onClick: (e) => navigate(`/product/${product.productId}`, { state: { product: product } }) }]
                }))}
                filter={{
                    label: 'Cartegory',
                    key: 'category',
                    menu: platform.categories
                }}
                createForm={userInfo.userType === UserType.PROVIDER ? <ProductCreateForm platformId={platform.platformId} /> : null}
            />
            <Footer />
        </>
    )
}

export default ProductGridScreen