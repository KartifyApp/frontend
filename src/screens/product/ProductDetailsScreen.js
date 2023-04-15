import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { GenericActions } from 'src/reduxManager/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import { ProductDeleteForm, ProductUpdateForm } from './ProductForms'
import { ProductReviewList } from './ProductReview'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { CartActions } from 'src/reduxManager/cartActions'

const ProductDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { productId } = useParams()

    const { loading, data: product, error } = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)
    const { cartProducts, error: cartDetailsError } = useSelector((state) => state.cartDetails)

    useEffect(() => {
        if (!userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        if (!productId) navigate('/product')
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${productId}`))
    }, [productId, userInfo, dispatch, navigate])

    useEffect(() => {
        if (error) toast.error(error)
        if (cartDetailsError) toast.error(cartDetailsError)
    }, [error, cartDetailsError])

    const productInfo = (
        <InfoComponent
            msg={[`${product.name} Details`]}
            data={[
                { key: 'Product ID', value: product.productId },
                { key: 'Name', value: product.name },
                { key: 'Image', value: product.image },
                { key: 'Brand', value: product.brand },
                { key: 'category', value: product.category },
                { key: 'Description', value: product.description },
                { key: 'Price', value: product.price },
                { key: 'Stock Count', value: product.stockCount },
                { key: 'Platform ID', value: product.platformId }
            ]}
            updateForm={userInfo.userType === UserType.PROVIDER && <ProductUpdateForm product={product} />}
            deleteForm={userInfo.userType === UserType.PROVIDER && <ProductDeleteForm product={product} />}
        />
    )

    return (
        <>
            <Header
                msg={[`Product Details`, `Product ID ${product.productId}`, `Get all information about ${product.name}`]}
                buttons={
                    userInfo.userType === UserType.CONSUMER && [
                        cartProducts[product.productId]
                            ? { label: 'Remove', onClick: (e) => dispatch(CartActions.removeFromcart(product)) }
                            : { label: 'Add', onClick: (e) => dispatch(CartActions.addToCart(product)) }
                    ]
                }
            />
            <Container maxWidth="lg">
                <TabsComponent
                    tabs={[
                        { value: 'productDetails', label: 'Details', component: productInfo },
                        {
                            value: 'reviews',
                            label: 'Reviews',
                            component: <ProductReviewList product={product} action={false} create={userInfo.userType === UserType.CONSUMER} />
                        }
                    ]}
                    loading={loading}
                />
            </Container>
            <Footer />
        </>
    )
}

export default ProductDetailsScreen
