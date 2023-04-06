import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Box, Button, CircularProgress, MenuItem } from '@mui/material'

import TabsComponent from 'src/components2/TabsComponent'
import { UserType } from 'src/constants/enumConstants'
import { login, register } from 'src/actions/userActions'

function UserAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        userType: ''
    })

    const { loading, success, error, userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
        if (error) {
            console.log(error)
            toast.error(error)
        }
        if (success) {
            toast.success(success)
        }
    }, [userInfo, loading])

    const loginForm = (
        <Card>
            <CardHeader title="Login with your credentials" />
            <Divider />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 }
                    }}
                    noValidate
                >
                    <TextField
                        required
                        label="Username"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    <TextField
                        required
                        label="Password"
                        value={loginData.password}
                        type="password"
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    {loading ? (
                        <CircularProgress size={64} disableShrink thickness={3} />
                    ) : (
                        <Button sx={{ margin: 2 }} variant="contained" onClick={(e) => dispatch(login(loginData))}>
                            Login
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    )

    const registerForm = (
        <Card>
            <CardHeader title="Register as a consumer, provider or delivery" />
            <Divider />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 }
                    }}
                    noValidate
                >
                    <TextField
                        required
                        label="Name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    <TextField
                        required
                        label="Email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    <TextField
                        required
                        select
                        label="User Type"
                        value={registerData.userType}
                        onChange={(e) => setRegisterData({ ...registerData, userType: e.target.value })}
                        style={{ width: '90%' }}
                    >
                        {Object.keys(UserType).map((key) => (
                            <MenuItem key={key} value={UserType[key]}>
                                {key}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        label="Username"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    <TextField
                        required
                        label="Password"
                        value={registerData.password}
                        type="password"
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        style={{ width: '90%' }}
                    />
                    {loading ? (
                        <CircularProgress size={64} disableShrink thickness={3} />
                    ) : (
                        <Button sx={{ margin: 2 }} variant="contained" onClick={(e) => dispatch(register(registerData))}>
                            Register
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    )

    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={0}>
            <Grid item xs={3.5}>
                <TabsComponent
                    msg={[`ASC Login`, `IITB ASC`, `Login to your account`]}
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
