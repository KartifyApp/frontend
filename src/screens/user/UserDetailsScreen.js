import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { GenericActions } from 'src/actions/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { toast } from 'react-toastify'
import { UserUpdateForm } from './UserForms'
import { PlatformReviewList } from '../platform/PlatformReview'
import { ProductReviewList } from '../product/ProductReview'

const UserDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES))
    }, [userInfo, dispatch, navigate])

    useEffect(() => {
        if (userDetails.error) {
            toast.error(userDetails.error)
            navigate('/status/404')
        }
    }, [userDetails])

    const userInfoComponent = (
        <InfoComponent
            msg={[`${userDetails.data.name} Details`]}
            data={[
                { key: 'User ID', value: userDetails.data.userId },
                { key: 'Name', value: userDetails.data.name },
                { key: 'Email', value: userDetails.data.email },
                { key: 'Username', value: userDetails.data.username },
                { key: 'User Type', value: userDetails.data.userType },
                {
                    key: 'Address',
                    value: [
                        { key: 'P.O.', value: userDetails.data.userAddress?.postOffice },
                        { key: 'City', value: userDetails.data.userAddress?.city },
                        { key: 'PIN', value: userDetails.data.userAddress?.pinCode },
                        { key: 'Country', value: userDetails.data.userAddress?.country },
                        { key: 'Phone', value: userDetails.data.userAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={<UserUpdateForm user={userDetails.data} />}
        />
    )

    return (
        <>
            <Header msg={[`User Profile`, `User ID ${userDetails.data.userId}`, `Get all information about your profile`]} />
            <TabsComponent
                tabs={[
                    { value: 'userDetails', label: 'Details', component: userInfoComponent },
                    userInfo.userType === UserType.CONSUMER && {
                        value: 'platformReviews',
                        label: 'Platform Reviews',
                        component: <PlatformReviewList create={false} action={true} />
                    },
                    userInfo.userType === UserType.CONSUMER && {
                        value: 'productReviews',
                        label: 'Product Reviews',
                        component: <ProductReviewList create={false} action={true} />
                    }
                ]}
                loading={false}
            />
            <Footer />
        </>
    )
}

export default UserDetailsScreen
