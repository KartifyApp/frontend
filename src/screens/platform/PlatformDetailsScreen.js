import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import { ProductListTable } from '../product/ProductListTable'
import { PlatformDeleteForm, PlatformUpdateForm } from './PlatformForms'
import { PlatformReviewList } from './PlatformReview'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'
import { toast } from 'react-toastify'

const PlatformDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { platformId } = useParams()

    const platformDetails = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platformId}`))
    }, [userInfo, platformId, dispatch, navigate])

    useEffect(() => {
        if (platformDetails.error) {
            toast.error(platformDetails.error)
        }
    }, [platformDetails])

    const platformInfo = (
        <InfoComponent
            msg={[`${platformDetails.data.name} Details`]}
            data={[
                { key: 'Platform ID', value: platformDetails.data.platformId },
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

export default PlatformDetailsScreen
