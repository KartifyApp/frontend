import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Container } from '@mui/material'

import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { GenericActions } from 'src/reduxManager/genericActions'
import { InfoComponent } from 'src/components/InfoComponent'
import { TabsComponent } from 'src/components/TabsComponent'
import { RouteConstants, UserType } from 'src/constants/enumConstants'
import { ProductListTable } from '../product/ProductListTable'
import { PlatformDeleteForm, PlatformUpdateForm } from './PlatformForms'
import { PlatformReviewList } from './PlatformReview'

const PlatformDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { platformId } = useParams()

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, data: platform } = useSelector((state) => state.dataDetails)

    useEffect(() => {
        if (!platformId) navigate('/platform')
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platformId}`))
    }, [platformId, dispatch, navigate])

    const platformInfo = (
        <InfoComponent
            msg={[`${platform.name} Details`]}
            data={[
                { key: 'Platform ID', value: platform.platformId },
                { key: 'Name', value: platform.name },
                { key: 'Image', value: platform.image },
                { key: 'Description', value: platform.description },
                { key: 'User ID', value: platform.userId },
                { key: 'Categories', value: platform.categories?.map((category, i) => ({ key: i + 1, value: category })) },
                { key: 'Platform Status', value: platform.platformStatus },
                {
                    key: 'Address',
                    value: [
                        { key: 'P.O.', value: platform.platformAddress?.postOffice },
                        { key: 'City', value: platform.platformAddress?.city },
                        { key: 'PIN', value: platform.platformAddress?.pinCode },
                        { key: 'Country', value: platform.platformAddress?.country },
                        { key: 'Phone', value: platform.platformAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={userInfo.userType === UserType.PROVIDER && <PlatformUpdateForm platform={platform} />}
            deleteForm={userInfo.userType === UserType.PROVIDER && <PlatformDeleteForm platform={platform} />}
        />
    )

    return (
        <>
            <Header
                msg={[`Platform Details`, `Platform ID ${platform.platformId}`, `Get all information about ${platform.name}`]}
                buttons={[
                    userInfo.userType !== UserType.CONSUMER && { label: 'Orders', onClick: (e) => navigate(`/order?platformId=${platform.platformId}`) },
                    userInfo.userType === UserType.PROVIDER && {
                        label: 'Delivery',
                        onClick: (e) => navigate(`/user/delivery-job?platformId=${platform.platformId}`)
                    }
                ]}
            />
            <Container maxWidth="lg">
                <TabsComponent
                    tabs={[
                        { value: 'platformDetails', label: 'Details', component: platformInfo },
                        userInfo.userType !== UserType.DELIVERY && {
                            value: 'reviews',
                            label: 'Reviews',
                            component: <PlatformReviewList platform={platform} create={userInfo.userType === UserType.CONSUMER} action={false} />
                        },
                        {
                            value: 'products',
                            label: 'Products',
                            component: <ProductListTable platform={platform} />
                        }
                    ]}
                    loading={loading}
                />
            </Container>
            <Footer />
        </>
    )
}

export default PlatformDetailsScreen
