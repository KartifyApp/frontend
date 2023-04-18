import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { GenericActions } from 'src/reduxManager/genericActions'
import { TableComponent } from 'src/components/TableComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import { ProductCreateForm } from './ProductForms'

export const ProductListTable = ({ platform }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data: products, error } = useSelector((state) => state.dataList)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PRODUCT_ROUTES, { platformId: platform.platformId }))
    }, [platform, dispatch])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const fields = [
        { key: 'productId', label: 'Product ID' },
        { key: 'name', label: 'Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'stockCount', label: 'Stock Count' }
    ]
    return (
        <TableComponent
            loading={loading}
            data={products.map((product) => ({ ...product, key: product.productId, onClick: (e) => navigate(`/product/${product.productId}`) }))}
            fields={fields}
            filter={{
                label: 'Category',
                key: 'category',
                menu: platform.categories
            }}
            msg={[`Products in platform ${platform.name}`]}
            createForm={userInfo.userType === UserType.PROVIDER && <ProductCreateForm platformId={platform.platformId} />}
        />
    )
}
