import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Container } from '@mui/material'

import { GenericActions } from 'src/reduxManager/genericActions'
import { CartActions } from 'src/reduxManager/cartActions'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { TableComponent } from 'src/components/TableComponent'
import { RouteConstants } from 'src/constants/enumConstants'
import { OrderCreateForm } from './OrderForms'

const CartTableScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data: products } = useSelector((state) => state.dataList)
    const { cartProducts, platformId } = useSelector((state) => state.cartDetails)

    useEffect(() => {
        platformId && dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId }))
    }, [platformId, dispatch])

    const fields = [
        { key: 'productId', label: 'Product ID' },
        { key: 'name', label: 'Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'stockCount', label: 'Stock Count' },
        { key: 'platformId', label: 'Platform ID' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'update', label: 'Update' }
    ]

    return (
        <>
            <Header msg={['Cart', 'Cart Products', 'Create an order from your cart']} />
            <Container maxWidth="lg">
                <TableComponent
                    loading={loading}
                    data={products
                        .filter((product) => cartProducts[product.productId])
                        .map((product) => ({
                            ...product,
                            key: product.productId,
                            quantity: cartProducts[product.productId],
                            onClick: (e) => navigate(`/product/${product.productId}`),
                            onRemove: () => dispatch(CartActions.decrementQuantity(product)),
                            onAdd: () => dispatch(CartActions.increaseQuantity(product))
                        }))}
                    fields={fields}
                    msg={[`Products currently in your cart`]}
                    createForm={<OrderCreateForm />}
                />
            </Container>
            <Footer />
        </>
    )
}

export default CartTableScreen
