import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { PlatformActions } from 'src/actions/platformActions'
import GridComponent from 'src/components2/GridComponent'
import { UserType } from 'src/enumConstants'

const PlatformList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, error, platforms } = useSelector((state) => state.platformList)

    useEffect(() => {
        if (error) toast.error(error)
        if (!userInfo || !userInfo.token) navigate('/auth')
        dispatch(PlatformActions.getPlatforms())
    }, [userInfo])

    return (
        <GridComponent
            msg={[
                'Platforms',
                userInfo.userType === UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice',
                'Platforms'
            ]}
            loading={loading}
            data={platforms.map((platform) => ({
                id: platform.platformId,
                name: platform.name,
                description: platform.description,
                buttons: [
                    { name: 'Info', onClick: (e) => {} },
                    { name: 'Products', onClick: (e) => navigate(`/platform/${platform.platformId}/products`, { state: { platform: platform } }) },
                    { name: 'Reviews', onClick: (e) => {} }
                ]
            }))}
            filters={[]}
        />
    )
}

export default PlatformList
