import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { GenericActions } from 'src/reduxManager/genericActions'
import { InfoComponent } from 'src/components2/InfoComponent'
import { TabsComponent } from 'src/components2/TabsComponent'
import { RouteConstants, UserType } from 'src/enumConstants'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { UserUpdateForm } from './UserForms'
import { PlatformReviewList } from '../platform/PlatformReview'
import { ProductReviewList } from '../product/ProductReview'

const UserDetailsScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, data: user, error } = useSelector((state) => state.dataDetails)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES))
    }, [userInfo, dispatch, navigate])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const userInfoComponent = (
        <InfoComponent
            msg={[`${user.name} Details`]}
            data={[
                { key: 'User ID', value: user.userId },
                { key: 'Name', value: user.name },
                { key: 'Email', value: user.email },
                { key: 'Username', value: user.username },
                { key: 'User Type', value: user.userType },
                {
                    key: 'Address',
                    value: [
                        { key: 'P.O.', value: user.userAddress?.postOffice },
                        { key: 'City', value: user.userAddress?.city },
                        { key: 'PIN', value: user.userAddress?.pinCode },
                        { key: 'Country', value: user.userAddress?.country },
                        { key: 'Phone', value: user.userAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={<UserUpdateForm user={user} />}
        />
    )

    return (
        <>
            <Header msg={[`User Profile`, `User ID ${user.userId}`, `Get all information about your profile`]} />
            <Container maxWidth="lg">
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
                    loading={loading}
                />
            </Container>
            <Footer />
        </>
    )
}

export default UserDetailsScreen
