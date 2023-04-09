import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { PlatformActions } from 'src/actions/platformActions'
import FormComponent from 'src/components2/FormComponent'
import GridComponent from 'src/components2/GridComponent'
import { PlatformStatus, UserType } from 'src/enumConstants'

const PlatformList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const platformList = useSelector((state) => state.platformList)
    const platformCreate = useSelector((state) => state.platformCreate)

    useEffect(() => {
        if (!userInfo || !userInfo.token) navigate('/auth')
        if (!platformCreate.loading) dispatch(PlatformActions.getPlatforms())
    }, [userInfo, platformCreate, dispatch, navigate])

    const createForm = (
        <FormComponent
            loading={platformCreate.loading}
            msg={['Create a new platform', 'Submit']}
            fields={[
                { key: 'name', label: 'Name', required: true },
                { key: 'description', label: 'Description' },
                { key: 'categories', label: 'Categories' },
                { key: 'platformStatus', label: 'Platform Status', dropdown: true, menu: Object.values(PlatformStatus), default: PlatformStatus.DOWNTIME }
            ]}
            submitAction={PlatformActions.createPlatform}
        />
    )

    return (
        <GridComponent
            msg={[
                'Platforms',
                userInfo.userType === UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice',
                'Platforms'
            ]}
            loading={platformList.loading}
            data={platformList.platforms.map((platform) => ({
                id: platform.platformId,
                name: [platform.name, platform.platformStatus].join('\xa0'.repeat(5)),
                description: platform.description,
                platformStatus: platform.platformStatus,
                buttons: [
                    { name: 'Info', onClick: (e) => {} },
                    { name: 'Products', onClick: (e) => navigate(`/platform/${platform.platformId}/products`, { state: { platform: platform } }) },
                    { name: 'Reviews', onClick: (e) => {} }
                ]
            }))}
            filter={{
                key: 'platformStatus',
                menu: Object.keys(PlatformStatus)
            }}
            createForm={createForm}
        />
    )
}

export default PlatformList
