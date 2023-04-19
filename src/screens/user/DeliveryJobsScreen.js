import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { GenericActions } from 'src/reduxManager/genericActions'
import { TableComponent } from 'src/components/TableComponent'
import { RouteConstants } from 'src/constants/enumConstants'
import { DeliveryJobDeleteForm, DeliveryJobUpdateForm } from './DeliveryJob'

const DeliveryJobsScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data: deliveryJobs, error } = useSelector((state) => state.dataList)

    const platformId = useSearchParams()[0].get('platformId')

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.DELIVERY_JOB, { platformId: platformId }))
    }, [platformId, dispatch])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

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
                    loading={loading}
                    data={deliveryJobs.map((deliveryJob) => ({
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
