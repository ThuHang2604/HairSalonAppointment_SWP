import React from 'react';
import { Container, TextField, Button, Card, CardContent, FormControlLabel, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import './Register.css';

function RegisterPage() {
  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={0} style={{ height: '100vh' }}>
        {/* Form Section */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
          <Card
            style={{
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              background: 'hsla(0, 0%, 100%, 0.85)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Typography variant="h4" mb={5} fontWeight="bold" gutterBottom>
                Sign up now
              </Typography>
              <TextField fullWidth label="Username" margin="normal" />
              <TextField fullWidth label="Phone number" margin="normal" />
              <TextField fullWidth label="Password" type="password" margin="normal" />

              <Button fullWidth variant="contained" color="primary" size="large" style={{ marginTop: '1rem' }}>
                Sign up
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Image Section */}
        <Grid item xs={false} md={6} style={{ height: '100vh' }}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt="Salon"
            src="https://i.pinimg.com/564x/82/bd/8b/82bd8b8197a1a7a95f7a4f7440b284cf.jpg"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
