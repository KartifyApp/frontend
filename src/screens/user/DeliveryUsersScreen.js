import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { GenericActions } from 'src/reduxManager/genericActions'
import { TableComponent } from 'src/components/TableComponent'
import { RouteConstants } from 'src/constants/enumConstants'
import { DeliveryJobCreateForm } from './DeliveryJob'

const DeliveryUsersScreen = () => {
    const dispatch = useDispatch()

    const { loading, data: deliveryUsers } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES + '/delivery'))
    }, [dispatch])

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
                    loading={loading}
                    data={deliveryUsers.map((deliveryUser) => ({
                        ...deliveryUser,
                        key: deliveryUser.userId,
                        phoneNumber: deliveryUser.userAddress?.phoneNumber,
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
