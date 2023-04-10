import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants } from 'src/enumConstants'
import { ProductListTable } from '../product/ProductListTable'
import { PlatformDeleteForm, PlatformUpdateForm } from './PlatformForms'
import { PlatformReviewList } from './PlatformReview'

const PlatformDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()
    const platform = state?.platform

    const platformDetails = useSelector((state) => state.dataDetails)

    useEffect(() => {
        if (!platform) navigate('/platform')
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`))
    }, [platform, dispatch, navigate])

    const platformInfo = (
        <InfoComponent
            msg={[`${platformDetails.data.name} Details`]}
            data={[
                { key: 'Platform ID', value: platformDetails.data.platformId },
                { key: 'Name', value: platformDetails.data.name },
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
            updateForm={<PlatformUpdateForm platform={platformDetails.data} />}
            deleteForm={<PlatformDeleteForm platform={platformDetails.data} />}
        />
    )

    return (
        <TabsComponent
            msg={[`Platform Details`, `Platform ID ${platformDetails.data.platformId}`, `Get all information about ${platformDetails.data.name}`]}
            tabs={[
                { value: 'platformDetails', label: 'Details', component: platformInfo },
                { value: 'reviews', label: 'Reviews', component: <PlatformReviewList platform={platformDetails.data} /> },
                { value: 'products', label: 'Products', component: <ProductListTable platform={platformDetails.data} /> }
            ]}
            loading={false}
        />
    )
}

export default PlatformDetails
