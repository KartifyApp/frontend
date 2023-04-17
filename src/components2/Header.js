import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { Box, Container, styled, Typography, Grid, Button } from '@mui/material'

const PageTitleStyle = styled(Box)(
    ({ theme }) => `
    padding: ${theme.spacing(4)};
`
)

const PageTitleWrapper = ({ children }) => {
    return (
        <PageTitleStyle className="MuiPageTitle-wrapper">
            <Container maxWidth="lg">{children}</Container>
        </PageTitleStyle>
    )
}

PageTitleWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export const Header = ({ msg, buttons }) => {
    return (
        <>
            <Helmet>
                <title>{msg[0]}</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container alignItems="center">
                    <Grid item xs={buttons ? 12 - buttons.filter((button) => button).length * 1.2 : 12}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {msg[1]}
                        </Typography>
                        <Typography variant="subtitle2">{msg[2]}</Typography>
                    </Grid>
                    {buttons &&
                        buttons
                            .filter((button) => button)
                            .map((button) => (
                                <Grid item key={button.label} xs={1.2}>
                                    <Button sx={{ margin: 0 }} variant="contained" onClick={button.onClick}>
                                        {button.label}
                                    </Button>
                                </Grid>
                            ))}
                </Grid>
            </PageTitleWrapper>
        </>
    )
}
