import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'
import { TableComponent } from 'src/components2/TableComponent'
import { RouteConstants } from 'src/enumConstants'
import { DeliveryJobCreateForm } from './DeliveryJobForms'

const DeliveryUsersScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deliveryUserList = useSelector((state) => state.dataList)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES + '/delivery'))
    }, [userInfo])

    useEffect(() => {
        if (deliveryUserList.error) toast.error(deliveryUserList.error)
    }, [deliveryUserList])

    const fields = [
        { key: 'userId', label: 'User ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'username', label: 'Username' },
        { key: 'phoneNumber', label: 'Phone' },
        { key: 'create', label: 'Create' }
    ]

    return (
        <>
            <Header msg={['Delivery Users', 'Delivery Users', 'User details of all delivery users']} />
            <Container maxWidth="lg">
                <TableComponent
                    loading={false}
                    data={deliveryUserList.data?.map((deliveryUser) => ({
                        ...deliveryUser,
                        key: deliveryUser.userId,
                        phoneNumber: deliveryUser.userAddress.phoneNumber,
                        createForm: <DeliveryJobCreateForm userId={deliveryUser.userId} />
                    }))}
                    fields={fields}
                    msg={[`Create a delivery job for the users`]}
                />
            </Container>
            <Footer />
        </>
    )
}

export default DeliveryUsersScreen
