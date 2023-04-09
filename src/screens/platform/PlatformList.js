import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { GenericActions } from 'src/actions/genericActions'
import GridComponent from 'src/components2/GridComponent'
import { PlatformStatus, RouteConstants, UserType } from 'src/enumConstants'
import { PlatformCreateForm } from './platformForms'

const PlatformList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const platformList = useSelector((state) => state.dataList)

    useEffect(() => {
        if (!userInfo || !userInfo.token) navigate('/auth')
        dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES))
    }, [userInfo, dispatch, navigate])

    return (
        <GridComponent
            msg={[
                'Platforms',
                userInfo.userType === UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice',
                'Platforms'
            ]}
            loading={platformList.loading}
            data={platformList.data?.map((platform) => ({
                id: platform.platformId,
                name: [platform.name, platform.platformStatus].join('\xa0'.repeat(5)),
                description: platform.description,
                platformStatus: platform.platformStatus,
                buttons: [
                    { name: 'Info', onClick: (e) => navigate(`/platform/${platform.platformId}`, { state: { platform: platform } }) },
                    { name: 'Products', onClick: (e) => navigate(`/platform/${platform.platformId}/products`, { state: { platform: platform } }) }
                ]
            }))}
            filter={{
                label: 'Status',
                key: 'platformStatus',
                menu: Object.keys(PlatformStatus)
            }}
            createForm={<PlatformCreateForm />}
        />
    )
}

export default PlatformList
