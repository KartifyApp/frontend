import { Container } from '@mui/material'

import { Header } from 'src/components2/Header'
import { Footer } from 'src/components2/Footer'
import { TabsComponent } from 'src/components2/TabsComponent'
import { UserLoginForm, UserRegisterForm } from './UserForms'

const UserAuthScreen = () => {
    return (
        <Container maxWidth="sm">
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
        </Container>
    )
}

export default UserAuthScreen
