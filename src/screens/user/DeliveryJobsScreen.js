import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'
import { TableComponent } from 'src/components2/TableComponent'
import { RouteConstants } from 'src/enumConstants'
import { DeliveryJobDeleteForm, DeliveryJobUpdateForm } from './DeliveryJobForms'
import { useSearchParams } from 'react-router-dom'

const DeliveryJobsScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deliveryJobList = useSelector((state) => state.dataList)
    const { userInfo } = useSelector((state) => state.userLogin)

    const platformId = useSearchParams()[0].get('platformId')

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB, { platformId: platformId }))
    }, [userInfo, platformId, navigate, dispatch])

    useEffect(() => {
        if (deliveryJobList.error) {
            toast.error(deliveryJobList.error)
        }
    }, [deliveryJobList])

    const fields = [
        { key: 'deliveryJobId', label: 'Job ID' },
        { key: 'salary', label: 'Salary' },
        { key: 'deliveryStatus', label: 'Status' },
        { key: 'userId', label: 'User ID' },
        { key: 'platformId', label: 'Platform ID' },
        { key: 'actions', label: 'Actions' }
    ]

    return (
        <>
            <Header msg={['Delivery Jobs', `Delivery Jobs ${platformId ? `for platform ID ${platformId}` : ''}`, 'Manage delivery jobs']} />
            <Container maxWidth="lg">
                <TableComponent
                    loading={false}
                    data={deliveryJobList.data.map((deliveryJob) => ({
                        ...deliveryJob,
                        key: deliveryJob.deliveryJobId,
                        onClick: (e) => navigate(`/platform/${deliveryJob.platformId}`),
                        updateForm: <DeliveryJobUpdateForm deliveryJob={deliveryJob} />,
                        deleteForm: <DeliveryJobDeleteForm deliveryJob={deliveryJob} />
                    }))}
                    fields={fields}
                    msg={[`Update or delete delivery jobs`]}
                />
            </Container>
            <Footer />
        </>
    )
}

export default DeliveryJobsScreen
