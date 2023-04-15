import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'

import { GenericActions } from 'src/reduxManager/genericActions'
import GridComponent from 'src/components2/GridComponent'
import { PlatformStatus, RouteConstants, UserType } from 'src/enumConstants'
import { PlatformCreateForm } from './PlatformForms'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'

const PlatformGridScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const platformList = useSelector((state) => state.dataList)

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES))
    }, [userInfo, dispatch, navigate])

    return (
        <>
            <Header
                msg={[
                    'Platforms',
                    userInfo?.userType === UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice'
                ]}
            />
            <Container maxWidth="lg">
                <GridComponent
                    msg={['Platforms']}
                    loading={platformList.loading}
                    data={platformList.data?.map((platform) => ({
                        id: platform.platformId,
                        name: [platform.name, platform.platformStatus].join('\xa0'.repeat(5)),
                        description: platform.description,
                        platformStatus: platform.platformStatus,
                        buttons: [
                            { name: 'Info', onClick: (e) => navigate(`/platform/${platform.platformId}`) },
                            { name: 'Products', onClick: (e) => navigate(`/product?platformId=${platform.platformId}`, { state: { platform: platform } }) }
                        ]
                    }))}
                    filter={{
                        label: 'Status',
                        key: 'platformStatus',
                        menu: Object.keys(PlatformStatus)
                    }}
                    createForm={userInfo.userType === UserType.PROVIDER ? <PlatformCreateForm /> : null}
                />
            </Container>
            <Footer />
        </>
    )
}

export default PlatformGridScreen
