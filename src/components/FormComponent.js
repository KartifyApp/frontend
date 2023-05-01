import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Card, CardHeader, Divider, Box, Button, TextField, MenuItem, CardContent, CircularProgress } from '@mui/material'

export const FormComponent = ({ msg, fields, submitHandler, loading }) => {
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const defaultData = {}
        for (var field of fields) {
            if (field) defaultData[field.key] = field.default || ''
        }
        setFormData(defaultData)
    }, [fields])

    return (
        <Card>
            <CardHeader title={msg[0]} style={{ textAlign: 'center' }} />
            <Divider />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        width: 500
                    }}
                    noValidate
                >
                    {fields
                        .filter((field) => field)
                        .map((field) =>
                            field.dropdown ? (
                                <TextField
                                    key={field.key}
                                    required={field.required}
                                    select
                                    label={field.label}
                                    value={formData[field.key] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                    style={{ width: '95%', margin: '8px' }}
                                >
                                    {field.menu.map((menuItem) => (
                                        <MenuItem key={menuItem} value={menuItem}>
                                            {menuItem}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <TextField
                                    key={field.key}
                                    required={field.required}
                                    type={field.key === 'password' ? 'password' : 'text'}
                                    label={field.label}
                                    value={formData[field.key] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
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
                            <Button
                                sx={{ margin: 2 }}
                                variant="contained"
                                onClick={(e) => {
                                    for (var field of fields) {
                                        if (field?.required && !formData[field.key]) {
                                            toast.error(`${field.label} value not provided.`)
                                            return
                                        }
                                    }
                                    submitHandler(formData)
                                }}
                            >
                                {msg[1]}
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}
