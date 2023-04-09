import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Grid } from '@mui/material'

import TabsComponent from 'src/components2/TabsComponent'
import { UserType } from 'src/enumConstants'
import { UserActions } from 'src/actions/userActions'
import FormComponent from 'src/components2/FormComponent'

const UserAuth = () => {
    const navigate = useNavigate()

    const { loading, success, error, userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            navigate('/')
        }
        if (error) {
            console.log(error)
            toast.error(error)
        }
        if (success) {
            toast.success(success)
        }
    }, [userInfo])

    const loginForm = (
        <FormComponent
            loading={loading}
            msg={['Login with your credentials', 'Login']}
            fields={[
                { key: 'username', label: 'Username', required: true },
                { key: 'password', label: 'Password', required: true }
            ]}
            submitAction={UserActions.login}
        />
    )

    const registerForm = (
        <FormComponent
            loading={loading}
            msg={['Register as a consumer, provider or delivery', 'Register']}
            fields={[
                { key: 'name', label: 'Name', required: true },
                { key: 'email', label: 'Email', required: true },
                { key: 'userType', label: 'User Type', dropdown: true, menu: Object.values(UserType), required: true },
                { key: 'username', label: 'Username', required: true },
                { key: 'password', label: 'Password', required: true }
            ]}
            submitAction={UserActions.register}
        />
    )

    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={0}>
            <Grid item xs={4.5}>
                <TabsComponent
                    msg={[`Login`, `Kartify Auth`, `Login to your account`]}
                    tabs={[
                        {
                            value: 'login',
                            label: 'Login',
                            component: loginForm
                        },
                        {
                            value: 'register',
                            label: 'Register',
                            component: registerForm
                        }
                    ]}
                    loading={loading}
                    refresh={false}
                />
            </Grid>
        </Grid>
    )
}

export default UserAuth
