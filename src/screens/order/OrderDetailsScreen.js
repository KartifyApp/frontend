import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { GenericActions } from 'src/reduxManager/genericActions'
import { RouteConstants } from 'src/enumConstants'
import { InfoComponent } from 'src/components2/InfoComponent'

const OrderDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { orderId } = useParams()

    const orderDetails = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.ORDER_ROUTES + `/${orderId}`))
    }, [userInfo, orderId, dispatch, navigate])

    useEffect(() => {
        if (orderDetails.error) {
            toast.error(orderDetails.error)
        }
    }, [orderDetails])

    const platformInfo = (
        <InfoComponent
            msg={[`${orderDetails.data.name} Details`]}
            data={[
                { key: 'Platform ID', value: orderDetails.data.platformId },
                { key: 'Name', value: platformDetails.data.name },
                { key: 'Image', value: platformDetails.data.image },
                { key: 'Description', value: platformDetails.data.description },
                { key: 'User ID', value: platformDetails.data.userId },
                { key: 'Categories', value: platformDetails.data.categories?.map((category, i) => ({ key: i + 1, value: category })) },
                { key: 'Platform Status', value: platformDetails.data.platformStatus },
                {
                    key: 'Address',
                    value: [
                        { key: 'P.O.', value: platformDetails.data.platformAddress?.postOffice },
                        { key: 'City', value: platformDetails.data.platformAddress?.city },
                        { key: 'PIN', value: platformDetails.data.platformAddress?.pinCode },
                        { key: 'Country', value: platformDetails.data.platformAddress?.country },
                        { key: 'Phone', value: platformDetails.data.platformAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={userInfo.userType === UserType.PROVIDER ? <PlatformUpdateForm platform={platformDetails.data} /> : null}
            deleteForm={userInfo.userType === UserType.PROVIDER ? <PlatformDeleteForm platform={platformDetails.data} /> : null}
        />
    )

    return (
        <>
            <Header
                msg={[`Platform Details`, `Platform ID ${platformDetails.data.platformId}`, `Get all information about ${platformDetails.data.name}`]}
                buttons={[
                    { label: 'Orders', onClick: (e) => {} },
                    userInfo.userType !== UserType.DELIVERY && {
                        label: 'Delivery',
                        onClick: (e) => navigate(`/user/delivery-job?platformId=${platformDetails.data.platformId}`)
                    }
                ]}
            />
            <TabsComponent
                tabs={[
                    { value: 'platformDetails', label: 'Details', component: platformInfo },
                    userInfo.userType !== UserType.DELIVERY && {
                        value: 'reviews',
                        label: 'Reviews',
                        component: <PlatformReviewList platform={platformDetails.data} create={userInfo.userType === UserType.CONSUMER} action={false} />
                    },
                    userInfo.userType !== UserType.DELIVERY && {
                        value: 'products',
                        label: 'Products',
                        component: <ProductListTable platform={platformDetails.data} />
                    }
                ]}
                loading={false}
            />
            <Footer />
        </>
    )
}

export default OrderDetailsScreen
