import { Card, CardHeader, Divider, Box, Button, TextField, MenuItem, CardContent } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const FormComponent = ({ msg, fields, postHandler }) => {
    const dispatch = useDispatch()

    const [data, setData] = useState({})

    useEffect(() => {
        fields.forEach((field) => (data[field.key] = ''))
    }, [data, fields])

    return (
        <Card>
            <CardHeader title={msg[0]} />
            <Divider />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 }
                    }}
                    noValidate
                >
                    {fields.map((field) =>
                        field.dropdown ? (
                            <TextField
                                key={field.key}
                                required
                                select
                                label={field.label}
                                value={data[field.key]}
                                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                style={{ width: '90%' }}
                            >
                                {Object.keys(field.menu).map((key) => (
                                    <MenuItem key={key} value={field.menu[key]}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                key={field.key}
                                required
                                type={field.key == 'password' ? 'password' : 'text'}
                                label={field.label}
                                value={data[field.key]}
                                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                style={{ width: '90%' }}
                            />
                        )
                    )}
                    <Box textAlign="center">
                        <Button sx={{ margin: 2 }} variant="contained" onClick={(e) => dispatch(postHandler(data))}>
                            {msg[1]}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default FormComponent
