import { Card, CardHeader, Divider, Box, CircularProgress, Button } from '@mui/material';

function FormComponent(fields) {
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
          {...fields}
          <TextField required label="ID" value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} style={{ width: '90%' }} />
          <TextField
            required
            label="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{ width: '90%' }}
          />
          <Button sx={{ margin: 2 }} variant="contained" onClick={submitHandler}>
            {msg[1]}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FormComponent;
