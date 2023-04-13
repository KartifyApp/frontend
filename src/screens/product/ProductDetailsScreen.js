import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import { ProductDeleteForm, ProductUpdateForm } from './ProductForms'
import { ProductReviewList } from './ProductReview'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { toast } from 'react-toastify'
import { CartActions } from 'src/actions/cartActions'

const ProductDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { productId } = useParams()

    const productDetails = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)
    const { cartProducts, error } = useSelector((state) => state.cartDetails)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        if (!productId) navigate('/product')
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${productId}`))
    }, [productId, userInfo, dispatch, navigate])

    useEffect(() => {
        if (productDetails.error) {
            toast.error(productDetails.error)
        }
        if (error) toast.error('Products must be from same platform')
    }, [productDetails, error])

    const productInfo = (
        <InfoComponent
            msg={[`${productDetails.data.name} Details`]}
            data={[
                { key: 'Product ID', value: productDetails.data.productId },
                { key: 'Name', value: productDetails.data.name },
                { key: 'Image', value: productDetails.data.image },
                { key: 'Brand', value: productDetails.data.brand },
                { key: 'category', value: productDetails.data.category },
                { key: 'Description', value: productDetails.data.description },
                { key: 'Price', value: productDetails.data.price },
                { key: 'Stock Count', value: productDetails.data.stockCount },
                { key: 'Platform ID', value: productDetails.data.platformId }
            ]}
            updateForm={<ProductUpdateForm product={productDetails.data} />}
            deleteForm={<ProductDeleteForm product={productDetails.data} />}
        />
    )

    return (
        <>
            <Header
                msg={[`Product Details`, `Product ID ${productDetails.data.productId}`, `Get all information about ${productDetails.data.name}`]}
                buttons={
                    userInfo.userType === UserType.CONSUMER && [
                        cartProducts[productDetails.data.productId]
                            ? { label: 'Remove', onClick: (e) => dispatch(CartActions.removeFromcart(productDetails.data)) }
                            : { label: 'Add', onClick: (e) => dispatch(CartActions.addToCart(productDetails.data)) }
                    ]
                }
            />
            <TabsComponent
                tabs={[
                    { value: 'productDetails', label: 'Details', component: productInfo },
                    {
                        value: 'reviews',
                        label: 'Reviews',
                        component: <ProductReviewList product={productDetails.data} action={false} create={userInfo.userType === UserType.CONSUMER} />
                    }
                ]}
                loading={false}
            />
            <Footer />
        </>
    )
}

export default ProductDetailsScreen
