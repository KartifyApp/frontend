import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container,
    Dialog,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

const GridComponent = ({ msg, loading, data, filter, createForm }) => {
    const [open, setOpen] = useState(false)
    const [filterValue, setFilterValue] = useState('All')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setOpen(false)
        setFilteredData(data || [])
    }, [data])
    return (
        <Container maxWidth="lg">
            <Card>
                <CardHeader
                    title={msg[0]}
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
                                                    sx={{ marginRight: 2 }}
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
                                            <Button size="large" sx={{ marginLeft: 2 }} variant="contained" onClick={(e) => setOpen(true)}>
                                                Create
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </>
                    }
                />
                <Divider />
                <CardContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container direction="row" justifyContent="left" alignItems="stretch" spacing={3}>
                            {filteredData.map((element) => (
                                <Grid item xs={4} key={element.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <CardMedia sx={{ height: 140 }} image="/static/images/placeholders/covers/6.jpg" title="Contemplative Reptile" />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {element.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {element.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing sx={{ mt: 'auto' }}>
                                            {element.buttons.map((button) => (
                                                <Button size="small" onClick={button.onClick} key={button.name}>
                                                    {button.name}
                                                </Button>
                                            ))}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {open && (
                        <Dialog onClose={(e) => setOpen(false)} open={open}>
                            {createForm}
                        </Dialog>
                    )}
                </CardContent>
            </Card>
        </Container>
    )
}

export default GridComponent
