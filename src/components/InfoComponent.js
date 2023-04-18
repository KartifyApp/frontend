import { Box, Button, Card, CardContent, CardHeader, Dialog, Divider, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const TextWrapper = styled('span')(
    ({ theme }) => `
    display: inline-block;
    align-items: center;

    &.flexItem {
        display: inline-flex;
    }
    
    &.MuiText {

        &-black {
        color: ${theme.palette.common.black}
        }

        &-primary {
        color: ${theme.palette.primary.main}
        }
        
        &-secondary {
        color: ${theme.palette.secondary.main}
        }
        
        &-success {
        color: ${theme.palette.success.main}
        }
        
        &-warning {
        color: ${theme.palette.warning.main}
        }
            
        &-error {
        color: ${theme.palette.error.main}
        }
        
        &-info {
        color: ${theme.palette.info.main}
        }
    }
  `
)

const Text = ({ className, color = 'secondary', flex, children, ...rest }) => {
    return (
        <TextWrapper className={clsx('MuiText-' + color, { flexItem: flex })} {...rest}>
            {children}
        </TextWrapper>
    )
}

Text.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'success', 'info', 'black'])
}

const InfoValueComponent = ({ element }) => {
    return (
        <>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                    {element.key}:
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <Text color="black">
                    {element.value && typeof element.value == 'object' ? (
                        <>
                            {element.value.map((element1) => (
                                <Grid container key={element1.key}>
                                    <Grid item xs={12} md={10} textAlign={{ sm: 'right' }}>
                                        <Box pr={3} pb={2}>
                                            {element1.key}:
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={2} key={element1.value}>
                                        <Text color="black">
                                            <b>{element1.value}</b>
                                        </Text>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <b>{element.value}</b>
                    )}
                </Text>
            </Grid>
        </>
    )
}

export const InfoComponent = ({ data, msg, updateForm, deleteForm }) => {
    const [updateOpen, setUpdateOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    useEffect(() => {
        setUpdateOpen(false)
        setDeleteOpen(false)
    }, [data])

    return (
        <Card>
            <CardHeader
                title={msg[0]}
                action={
                    <>
                        <Box width={300}>
                            <Grid container justifyContent="flex-end">
                                {updateForm && (
                                    <Grid item xs={4}>
                                        <Button sx={{ marginRight: 2 }} variant="contained" onClick={(e) => setUpdateOpen(true)}>
                                            Update
                                        </Button>
                                    </Grid>
                                )}
                                {deleteForm && (
                                    <Grid item xs={4}>
                                        <Button sx={{ marginRight: 2, backgroundColor: 'red' }} variant="contained" onClick={(e) => setDeleteOpen(true)}>
                                            Delete
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </>
                }
            />
            <Divider />
            <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                        {data.map((element) => {
                            return <InfoValueComponent key={element.key} element={element} />
                        })}
                    </Grid>
                </Typography>
                {updateForm && (
                    <Dialog onClose={(e) => setUpdateOpen(false)} open={updateOpen}>
                        {updateForm}
                    </Dialog>
                )}
                {deleteForm && (
                    <Dialog onClose={(e) => setDeleteOpen(false)} open={deleteOpen}>
                        {deleteForm}
                    </Dialog>
                )}
            </CardContent>
        </Card>
    )
}
