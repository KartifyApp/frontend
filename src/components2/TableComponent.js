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
    Dialog
} from '@mui/material'

const TableComponent = ({ fields, data, msg, loading, filter, createForm }) => {
    const [open, setOpen] = useState(false)
    const [filterValue, setFilterValue] = useState('All')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setOpen(false)
        console.log(data)
        setFilteredData(data || [])
    }, [data, loading])

    return (
        <Card>
            <CardHeader
                action={
                    <>
                        <Box width={300}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>{filter.label}</InputLabel>
                                        <Select
                                            value={filterValue}
                                            onChange={(e) => {
                                                setFilterValue(e.target.value)
                                                setFilteredData(data.filter((element) => element[filter.key] === e.target.value || e.target.value === 'All'))
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
                                <Grid item xs={6}>
                                    <Button size="large" sx={{ marginLeft: 2 }} variant="contained" onClick={(e) => setOpen(true)}>
                                        Create
                                    </Button>
                                </Grid>
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
                        {filteredData.map((data) => (
                            <TableRow hover key={data.key} onClick={data.onClick}>
                                {fields.map((field) => (
                                    <TableCell key={field.key} align="center">
                                        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                                            {data[field.key]}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {open && (
                    <Dialog onClose={(e) => setOpen(false)} open={open}>
                        {createForm}
                    </Dialog>
                )}
            </TableContainer>
        </Card>
    )
}

export default TableComponent
