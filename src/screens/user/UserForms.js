import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { GenericActions } from 'src/reduxManager/genericActions'
import { UserActions } from 'src/reduxManager/userActions'
import { FormComponent } from 'src/components/FormComponent'
import { AddressKeys, RouteConstants, UserType } from 'src/constants/enumConstants'

export const UserRegisterForm = () => {
    const dispatch = useDispatch()

    const { loading, data: createdUser } = useSelector((state) => state.dataCreate)

    useEffect(() => {
        if (createdUser.name) {
            toast.success(`${createdUser.name} registered successfully`)
        }
    }, [createdUser])

    const fields = [
        { key: 'name', label: 'Name', required: true },
        { key: 'email', label: 'Email', required: true },
        { key: 'userType', label: 'User Type', dropdown: true, menu: Object.values(UserType), default: UserType.CONSUMER },
        { key: 'username', label: 'Username', required: true },
        { key: 'password', label: 'Password', required: true },
        { key: 'postOffice', label: 'Post Office' },
        { key: 'city', label: 'City' },
        { key: 'pinCode', label: 'PIN Code' },
        { key: 'country', label: 'Country' },
        { key: 'phoneNumber', label: 'Phone' }
    ]

    const submitHandler = (data) => {
        data.userAddress = {}
        for (var key of AddressKeys) {
            data.userAddress[key] = data[key]
            delete data[key]
        }
        dispatch(GenericActions.createData(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={['Register as a consumer, provider or delivery', 'Register']} fields={fields} submitHandler={submitHandler} />
}

export const UserLoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo.token) {
            toast.success('Login successful')
            navigate('/')
        }
    }, [userInfo, navigate])

    const fields = [
        { key: 'username', label: 'Username', required: true },
        { key: 'password', label: 'Password', required: true }
    ]

    const submitHandler = (data) => {
        dispatch(UserActions.login(data))
    }

    return <FormComponent loading={loading} msg={['Login with your credentials', 'Login']} fields={fields} submitHandler={submitHandler} />
}

export const UserUpdateForm = ({ user }) => {
    const dispatch = useDispatch()

    const { loading, data: updatedUser } = useSelector((state) => state.dataUpdate)

    useEffect(() => {
        if (updatedUser.userId) {
            toast.success(`User ID ${updatedUser.userId} updated successfully`)
            dispatch(GenericActions.getDataDetails(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES))
        }
    }, [updatedUser, dispatch])

    const fields = [
        { key: 'name', label: 'Name', required: true, default: user.name },
        { key: 'email', label: 'Email', required: true, default: user.email },
        { key: 'username', label: 'Username', required: true, default: user.username },
        { key: 'password', label: 'Password', default: user.password },
        { key: 'postOffice', label: 'Post Office', default: user.userAddress.postOffice },
        { key: 'city', label: 'City', default: user.userAddress.city },
        { key: 'pinCode', label: 'PIN Code', default: user.userAddress.pinCode },
        { key: 'country', label: 'Country', default: user.userAddress.country },
        { key: 'phoneNumber', label: 'Phone', default: user.userAddress.phoneNumber }
    ]

    const submitHandler = (data) => {
        data.userAddress = {}
        for (var key of AddressKeys) {
            data.userAddress[key] = data[key]
            delete data[key]
        }
        dispatch(GenericActions.updateData(RouteConstants.BASE_URL + RouteConstants.USER_ROUTES, data))
    }

    return <FormComponent loading={loading} msg={[`Update user ${user.name}`, 'Update']} fields={fields} submitHandler={submitHandler} />
}
