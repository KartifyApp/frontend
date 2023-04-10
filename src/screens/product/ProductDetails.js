import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants } from 'src/enumConstants'
import { ProductDeleteForm, ProductUpdateForm } from './ProductForms'
import { ProductReviewList } from './ProductReview'

const ProductDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()
    const product = state?.product

    const productDetails = useSelector((state) => state.dataDetails)

    useEffect(() => {
        if (!product) navigate('/product')
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES + `/${product.productId}`))
    }, [product, dispatch, navigate])

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
        <TabsComponent
            msg={[`Product Details`, `Product ID ${productDetails.data.productId}`, `Get all information about ${productDetails.data.name}`]}
            tabs={[
                { value: 'productDetails', label: 'Details', component: productInfo },
                { value: 'reviews', label: 'Reviews', component: <ProductReviewList product={productDetails.data} /> }
            ]}
            loading={false}
        />
    )
}

export default ProductDetails
