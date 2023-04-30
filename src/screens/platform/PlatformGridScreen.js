import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Container } from '@mui/material'

import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { GenericActions } from 'src/reduxManager/genericActions'
import { GridComponent } from 'src/components/GridComponent'
import { PlatformStatus, RouteConstants, UserType } from 'src/constants/enumConstants'
import { PlatformCreateForm } from './PlatformForms'

const PlatformGridScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, data: platforms } = useSelector((state) => state.dataList)

    useEffect(() => {
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES))
    }, [dispatch])

    return (
        <>
            <Header
                msg={['Platforms', userInfo.userType === UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice']}
            />
            <Container maxWidth="lg">
                <GridComponent
                    msg={['Platforms']}
                    loading={loading}
                    data={platforms.map((platform) => ({
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
                    createForm={userInfo.userType === UserType.PROVIDER && <PlatformCreateForm />}
                />
            </Container>
            <Footer />
        </>
    )
}

export default PlatformGridScreen
