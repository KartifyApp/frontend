import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Grid } from '@mui/material'

import { TabsComponent } from 'src/components2/TabsComponent'
import { UserType } from 'src/enumConstants'
import { UserActions } from 'src/actions/userActions'
import FormComponent from 'src/components2/FormComponent'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'

const UserAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, success, error, userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            navigate('/')
        }
        if (error) {
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
            submitHandler={(data) => dispatch(UserActions.login(data))}
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
            submitHandler={(data) => dispatch(UserActions.register(data))}
        />
    )

    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={0}>
            <Grid item xs={4.5}>
                <Header msg={[`Login`, `Kartify Auth`, `Login to your account`]} />
                <TabsComponent
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
                <Footer />
            </Grid>
        </Grid>
    )
}

export default UserAuth
