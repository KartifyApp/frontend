import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { GenericActions } from 'src/reduxManager/genericActions'
import { GridComponent } from 'src/components/GridComponent'
import { RouteConstants, UserType } from 'src/constants/enumConstants'
import { ProductCreateForm } from './ProductForms'

const ProductGridScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { state } = useLocation()
    const platform = state?.platform

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, data: products, error } = useSelector((state) => state.dataList)

    useEffect(() => {
        if (!platform) navigate('/platform')
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
    }, [platform, dispatch, navigate])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    return (
        <>
            <Header msg={['Products', `Products for  platform '${platform.name}'`]} />
            <Container maxWidth="lg">
                <GridComponent
                    msg={['Products']}
                    loading={loading}
                    data={products.map((product) => ({
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
                    createForm={userInfo.userType === UserType.PROVIDER && <ProductCreateForm platformId={platform.platformId} />}
                />
            </Container>
            <Footer />
        </>
    )
}

export default ProductGridScreen
