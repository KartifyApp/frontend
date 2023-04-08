import { Card, CardHeader, Divider, Box, Button, TextField, MenuItem, CardContent, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const FormComponent = ({ loading, msg, fields, submitAction }) => {
    const dispatch = useDispatch()

    const [data, setData] = useState({})

    useEffect(() => {
        const defaultData = {}
        for (var field of fields) {
            defaultData[field.key] = field.default
        }
        setData(defaultData)
    }, [fields, loading])

    const submitHandler = () => {
        for (var field of fields) {
            if (field.required && !data[field.key]) {
                toast.error(`${field.key} value not provided.`)
                return
            }
        }
        dispatch(submitAction(data))
    }

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
                                required={field.required}
                                select
                                label={field.label}
                                value={data[field.key]}
                                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                style={{ width: '95%', margin: '8px' }}
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
                                required={field.required}
                                type={field.key === 'password' ? 'password' : 'text'}
                                label={field.label}
                                value={data[field.key]}
                                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                style={{ width: '95%', margin: '8px' }}
                            />
                        )
                    )}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box textAlign="center">
                            <Button sx={{ margin: 2 }} variant="contained" onClick={(e) => submitHandler()}>
                                {msg[1]}
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

export default FormComponent
