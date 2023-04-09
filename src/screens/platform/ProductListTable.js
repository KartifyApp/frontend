import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import TableComponent from 'src/components2/TableComponent'
import { RouteConstants } from 'src/enumConstants'
import { ProductCreateForm } from '../product/productForms'

const ProductListTable = ({ platform }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
    }, [platform])

    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'stockCount', label: 'Stock Count' },
        { key: 'platformId', label: 'Platform ID' }
    ]
    return (
        <TableComponent
            loading={productList.loading}
            data={productList.data?.map((product) => ({ ...product, key: product.productId, onClick: (e) => navigate(`/product/${product.productId}`) }))}
            fields={fields}
            filter={{
                label: 'Category',
                key: 'category',
                menu: platform.categories
            }}
            msg={[`Products in platform ${platform.name}`]}
            createForm={<ProductCreateForm platformId={platform.platformId} />}
        />
    )
}

export default ProductListTable
