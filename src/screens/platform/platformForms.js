import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.PLATFORM_ROUTES, data))
    }

    return <FormComponent loading={platformCreate.loading} msg={['Create a new platform', 'Submit']} fields={fields} submitHandler={submitHandler} />
}
