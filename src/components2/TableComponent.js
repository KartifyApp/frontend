import { useEffect, useState } from 'react'
import {
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    CardHeader,
    Grid,
    Button,
    Dialog,
    IconButton,
    useTheme
} from '@mui/material'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

export const TableComponent = ({ fields, data, msg, loading, filter, createForm }) => {
    const theme = useTheme()

    const [open, setOpen] = useState(false)
    const [form, setForm] = useState(createForm)
    const [filterValue, setFilterValue] = useState('All')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setOpen(false)
        setFilteredData(data || [])
    }, [data, loading])

    return (
        <Card>
            <CardHeader
                action={
                    <>
                        <Box width={300}>
                            <Grid container justifyContent="flex-end">
                                {filter && (
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>{filter.label}</InputLabel>
                                            <Select
                                                value={filterValue}
                                                onChange={(e) => {
                                                    setFilterValue(e.target.value)
                                                    setFilteredData(
                                                        data.filter((element) => element[filter.key] === e.target.value || e.target.value === 'All')
                                                    )
                                                }}
                                                label="Filter"
                                                autoWidth
                                            >
                                                {['All', ...filter.menu].map((mentItem) => (
                                                    <MenuItem key={mentItem} value={mentItem}>
                                                        {mentItem}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}
                                {createForm && (
                                    <Grid item xs={6}>
                                        <Button
                                            size="large"
                                            sx={{ marginLeft: 2 }}
                                            variant="contained"
                                            onClick={(e) => {
                                                setOpen(true)
                                                setForm(createForm)
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </>
                }
                title={msg[0]}
            />
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {fields.map((field) => (
                                <TableCell key={field.key} align="center">
                                    {field.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.key} hover onClick={row.onClick}>
                                {fields.map((field) => (
                                    <TableCell key={field.key} align="center">
                                        {field.key === 'actions' ? (
                                            <>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={(e) => {
                                                        setOpen(true)
                                                        setForm(row.updateForm)
                                                    }}
                                                    key={1}
                                                >
                                                    <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': { background: theme.colors.error.lighter },
                                                        color: theme.palette.error.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={(e) => {
                                                        setOpen(true)
                                                        setForm(row.deleteForm)
                                                    }}
                                                    key={2}
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                                                {row[field.key]}
                                            </Typography>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog onClose={(e) => setOpen(false)} open={open}>
                    {form}
                </Dialog>
            </TableContainer>
        </Card>
    )
}
