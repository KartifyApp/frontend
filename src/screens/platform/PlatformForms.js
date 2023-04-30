import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/reduxManager/genericActions'
import { FormComponent } from 'src/components/FormComponent'
import { AddressKeys, PlatformStatus, RouteConstants } from 'src/constants/enumConstants'

export const PlatformCreateForm = () => {
    const dispatch = useDispatch()

    const { loading, data: createdPlatform } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (createdPlatform.name) {
            toast.success(`${createdPlatform.name} created successfully`)
            dispatch(GenericActions.getDataList(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES))
        }
    }, [createdPlatform, dispatch])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'description', label: 'Description' },
        { key: 'categories', label: 'Categories' },
        { key: 'platformStatus', label: 'Platform Status', dropdown: true, menu: Object.values(PlatformStatus), default: PlatformStatus.DOWNTIME },
        { key: 'postOffice', label: 'Post Office' },
        { key: 'city', label: 'City' },
        { key: 'pinCode', label: 'PIN Code' },
        { key: 'country', label: 'Country' },
        { key: 'phoneNumber', label: 'Phone' }
    ]

    const submitHandler = (data) => {
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
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Create a new platform', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformUpdateForm = ({ platform }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedPlatform } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (updatedPlatform.platformId) {
            toast.success(`Platform ID ${updatedPlatform.platformId} updated successfully`)
            dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`))
        }
    }, [updatedPlatform, dispatch, platform])

    const fields = [
        { key: 'name', label: 'Name', required: true, default: platform.name },
        { key: 'image', label: 'Image', default: platform.image },
        { key: 'description', label: 'Description', default: platform.description },
        { key: 'categories', label: 'Categories', default: platform.categories?.join(',') },
        { key: 'platformStatus', label: 'Platform Status', dropdown: true, menu: Object.values(PlatformStatus), default: platform.platformStatus },
        { key: 'postOffice', label: 'Post Office', default: platform.platformAddress?.postOffice },
        { key: 'city', label: 'City', default: platform.platformAddress?.city },
        { key: 'pinCode', label: 'PIN Code', default: platform.platformAddress?.pinCode },
        { key: 'country', label: 'Country', default: platform.platformAddress?.country },
        { key: 'phoneNumber', label: 'Phone', default: platform.platformAddress?.phoneNumber }
    ]

    const submitHandler = (data) => {
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
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`, data))
    }

    return <FormComponent loading={loading} msg={[`Update platform ${platform.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformDeleteForm = ({ platform }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, data: deletedPlatform } = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (deletedPlatform.platformId) {
            toast.success(`Platform ID ${deletedPlatform.platformId} deleted successfully`)
            navigate('/platform')
        }
    }, [deletedPlatform, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`))
    }

    return <FormComponent loading={loading} msg={[`Delete platform ${platform.name}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}
