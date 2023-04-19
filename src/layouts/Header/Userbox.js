import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Divider, Hidden, lighten, Popover, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions } from 'src/reduxManager/userActions'
import { toast } from 'react-toastify'

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
)

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
)

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
)

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
)

function HeaderUserbox() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpen, setOpen] = useState(false)
    const ref = useRef(null)

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (!userInfo.token) {
            toast.error('No token found')
            navigate('/auth')
        }
    }, [userInfo, navigate])

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={(e) => setOpen(true)}>
                <Avatar variant="rounded" alt={userInfo.name} />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{userInfo.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">{userInfo.userType}</UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={(e) => setOpen(false)}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar variant="rounded" alt={userInfo.name} />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{userInfo.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">{userInfo.userType}</UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider />
                <Box sx={{ m: 0.5 }}>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={(e) => {
                            dispatch(UserActions.logout())
                            navigate('/auth')
                        }}
                    >
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    )
}

export default HeaderUserbox
