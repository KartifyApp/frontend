import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import Footer from 'src/components2/Footer'
import Header from 'src/components2/Header'

const GridComponent = ({ msg, loading, data }) => {
    useEffect(() => {}, [data, loading])
    return (
        <>
            <Header msg={[msg[0], msg[1]]} />
            <Container maxWidth="lg">
                <Card>
                    <CardHeader title={msg[2]} />
                    <Divider />
                    <CardContent>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container direction="row" justifyContent="left" alignItems="stretch" spacing={3}>
                                {data.map((element) => (
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
                                                <Button size="small">{element.button1.name}</Button>
                                                <Button size="small">{element.button2.name}</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </>
    )
}

export default GridComponent
