import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { PlatformActions } from 'src/actions/platformActions'
import GridComponent from 'src/components2/GridComponent'
import { RouteConstants, UserType } from 'src/enumConstants'

const PlatformList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, error, platforms } = useSelector((state) => state.platformList)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            dispatch(PlatformActions.getPlatforms())
        } else {
            navigate(RouteConstants.AUTH_PATH)
        }
    }, [userInfo])

    return (
        <GridComponent
            msg={[
                'Platforms',
                userInfo.userType == UserType.PROVIDER ? 'View all the platforms created by you' : 'Shop from any platform of your choice',
                'Platforms'
            ]}
            loading={loading}
            data={platforms.map((platform) => ({
                id: platform.platformId,
                name: platform.name,
                description: platform.description,
                button1: {
                    name: 'Info'
                },
                button2: {
                    name: 'Products'
                }
            }))}
        />
    )
}

export default PlatformList
