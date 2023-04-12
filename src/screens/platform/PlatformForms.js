import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { GenericActions } from 'src/actions/genericActions'
import FormComponent from 'src/components2/FormComponent'
import { AddressKeys, PlatformStatus, RouteConstants } from 'src/enumConstants'

export const PlatformCreateForm = () => {
    const dispatch = useDispatch()

    const platformCreate = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (platformCreate.error) toast.error(platformCreate.error)
        if (platformCreate.data) {
            toast.success(`${platformCreate.data.name} created successfully`)
            window.location.reload()
        }
    }, [platformCreate])

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

    return <FormComponent loading={platformCreate.loading} msg={['Create a new platform', 'Submit']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformUpdateForm = ({ platform }) => {
    const dispatch = useDispatch()

    const platformUpdate = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (platformUpdate.error) toast.error(platformUpdate.error)
        if (platformUpdate.data) {
            toast.success(`Platform ID ${platformUpdate.data.platformId} updated successfully`)
            window.location.reload()
        }
    }, [platformUpdate, platform])

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

    return <FormComponent loading={platformUpdate.loading} msg={[`Update platform ${platform.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}

export const PlatformDeleteForm = ({ platform }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const platformDelete = useSelector((state) => state.dataDelete)

    useEffect(() => {
        if (platformDelete.error) toast.error(platformDelete.error)
        if (platformDelete.data) {
            toast.success(`Platform ID ${platformDelete.data.platformId} deleted successfully`)
            navigate('/platform')
        }
    }, [platformDelete, navigate])

    const deleteHandler = () => {
        dispatch(GenericActions.deleteData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES + `/${platform.platformId}`))
    }

    return <FormComponent loading={platformDelete.loading} msg={[`Delete platform ${platform.name}`, 'OK']} fields={[]} submitHandler={deleteHandler} />
}
