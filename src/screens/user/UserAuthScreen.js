import { Grid } from '@mui/material'

import { TabsComponent } from 'src/components2/TabsComponent'
import Header from 'src/components2/Header'
import Footer from 'src/components2/Footer'
import { UserLoginForm, UserRegisterForm } from './UserForms'

const UserAuthScreen = () => {
    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={0}>
            <Grid item xs={4.5}>
                <Header msg={[`User`, `Kartify Auth`, `Sign In or Sign Up to use all features of our app`]} />
                <TabsComponent
                    tabs={[
                        {
                            value: 'login',
                            label: 'Login',
                            component: <UserLoginForm />
                        },
                        {
                            value: 'register',
                            label: 'Register',
                            component: <UserRegisterForm />
                        }
                    ]}
                    loading={false}
                    refresh={false}
                />
                <Footer />
            </Grid>
        </Grid>
    )
}

export default UserAuthScreen
