import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import { CartActions } from 'src/reduxManager/cartActions'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'
import { TableComponent } from 'src/components2/TableComponent'
import { RouteConstants } from 'src/enumConstants'
import { OrderCreateForm } from './OrderForms'

const CartTableScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartProducts, platformId, error } = useSelector((state) => state.cartDetails)
    const { userInfo } = useSelector((state) => state.userLogin)
    const productList = useSelector((state) => state.dataList)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        platformId && dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId }))
    }, [userInfo, platformId, navigate, dispatch])

    useEffect(() => {
        if (productList.error) toast.error(productList.error)
        if (error) toast.error('Cannot exceed stock count')
    }, [productList, error, cartProducts])

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
            <Header msg={['Cart', 'Cart Products', 'Manage your cart products']} buttons={[{ label: 'Place', onClick: (e) => setOpen(true) }]} />
            <OrderCreateForm open={open} setOpen={setOpen} />
            <Container maxWidth="lg">
                <TableComponent
                    loading={false}
                    data={productList.data
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
                />
            </Container>
            <Footer />
        </>
    )
}

export default CartTableScreen
