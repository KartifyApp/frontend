import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { InfoComponent } from 'src/components2/InfoComponent'
import TabsComponent from 'src/components2/TabsComponent'
import { AddressKeys, PlatformStatus, RouteConstants } from 'src/enumConstants'

const PlatformDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()
    const platform = state?.platform

    const platformDetails = useSelector((state) => state.dataDetails)
    const platformUpdate = useSelector((state) => state.dataUpdate)
    const platformDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (!platform) navigate('/platform')
        if (platformUpdate.error) toast.error(platformUpdate.error)
        if (platformUpdate.data) toast.success(`Platform ID ${platformUpdate.data.platformId} updated successfully`)
        if (!platformUpdate.loading)
            dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`))
    }, [platform, platformUpdate.loading, dispatch, navigate])

    useEffect(() => {
        if (platformDelete.error) toast.error(platformDelete.error)
        if (platformDelete.data) {
            toast.success(`Platform ID ${platformDelete.data.platformId} deleted successfully`)
            navigate('/platform')
        }
    }, [platformDelete.loading, navigate])

    const fields = [
        { key: 'name', label: 'Name', required: true, default: platformDetails.data.name },
        { key: 'description', label: 'Description', default: platformDetails.data.description },
        { key: 'categories', label: 'Categories', default: platformDetails.data.categories?.join(',') },
        { key: 'platformStatus', label: 'Platform Status', dropdown: true, menu: Object.values(PlatformStatus), default: platformDetails.data.platformStatus },
        { key: 'postOffice', label: 'Post Office', default: platformDetails.data.platformAddress?.postOffice },
        { key: 'city', label: 'City', default: platformDetails.data.platformAddress?.city },
        { key: 'pinCode', label: 'PIN Code', default: platformDetails.data.platformAddress?.pinCode },
        { key: 'country', label: 'Country', default: platformDetails.data.platformAddress?.country },
        { key: 'phoneNumber', label: 'Phone', default: platformDetails.data.platformAddress?.phoneNumber }
    ]

    const submitHandler = (data) => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.label} value not provided.`)
                return
            }
        }
        data.categories = data.categories
            ? data.categories
                  .split(',')
                  .map((category) => category.trim())
                  .filter((category) => category.length > 0)
            : []
        data.platformAddress = {}
        for (var key of AddressKeys) {
            data.platformAddress[key] = data[key]
            delete data[key]
        }
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platformDetails.data.platformId}`, data))
    }

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platformDetails.data.platformId}`))
    }

    const platformInfo = (
        <InfoComponent
            msg={[`${platformDetails.data.name} Details`]}
            data={[
                { key: 'Platform ID', value: platformDetails.data.platformId },
                { key: 'Name', value: platformDetails.data.name },
                { key: 'Description', value: platformDetails.data.description },
                { key: 'User ID', value: platformDetails.data.userId },
                { key: 'Categories', value: platformDetails.data.categories?.map((category, i) => ({ key: i + 1, value: category })) },
                { key: 'Platform Status', value: platformDetails.data.platformStatus },
                {
                    key: 'Address',
                    value: [
                        { key: 'P.O.', value: platformDetails.data.platformAddress?.postOffice },
                        { key: 'City', value: platformDetails.data.platformAddress?.city },
                        { key: 'PIN', value: platformDetails.data.platformAddress?.pinCode },
                        { key: 'Country', value: platformDetails.data.platformAddress?.country },
                        { key: 'Phone', value: platformDetails.data.platformAddress?.phoneNumber }
                    ]
                }
            ]}
            updateForm={
                <FormComponent
                    loading={platformUpdate.loading}
                    msg={[`Update platform ${platformDetails.data.name}`, 'Update']}
                    fields={fields}
                    submitHandler={submitHandler}
                />
            }
            deleteHandler={deleteHandler}
        />
    )

    return (
        <TabsComponent
            msg={[`Platform Details`, `Platform ID ${platformDetails.data.platformId}`, `Get all information about ${platformDetails.data.name}`]}
            tabs={[
                { value: 'platformDetails', label: 'Details', component: platformInfo },
                { value: 'reviews', label: 'Reviews', component: platformInfo },
                { value: 'products', label: 'Products', component: platformInfo }
            ]}
            loading={false}
        />
    )
}

export default PlatformDetails
