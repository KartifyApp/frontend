import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import GridComponent from 'src/components2/GridComponent'
import { PlatformStatus, RouteConstants, UserType } from 'src/enumConstants'

const PlatformList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.userLogin)
    const platformList = useSelector((state) => state.dataList)
    const platformCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (!userInfo || !userInfo.token) navigate('/auth')
        if (platformCreate.error) {
            toast.error(platformCreate.error)
            delete platformCreate.error
        }
        if (platformCreate.data) {
            toast.success(`${platformCreate.data.name} created successfully`)
            delete platformCreate.data
        }
        if (!platformCreate.loading) dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES))
    }, [userInfo, platformCreate.loading, dispatch, navigate])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'description', label: 'Description' },
        { key: 'categories', label: 'Categories' },
        { key: 'platformStatus', label: 'Platform Status', dropdown: true, menu: Object.values(PlatformStatus), default: PlatformStatus.DOWNTIME }
    ]

    const submitHandler = (data) => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        if (data.categories) {
            data.categories = data.categories
                .split(',')
                .map((category) => category.trim())
                .filter((category) => category.length > 0)
        }
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES, data))
    }

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
                    { name: 'Info', onClick: (e) => {} },
                    { name: 'Products', onClick: (e) => navigate(`/platform/${platform.platformId}/products`, { state: { platform: platform } }) }
                ]
            }))}
            filter={{
                key: 'platformStatus',
                menu: Object.keys(PlatformStatus)
            }}
            createForm={
                <FormComponent loading={platformCreate.loading} msg={['Create a new platform', 'Submit']} fields={fields} submitHandler={submitHandler} />
            }
        />
    )
}

export default PlatformList
