import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useAxios from '@/hooks/useAxios';

function RegisterPage() {
  const navigate = useNavigate();
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const INITIAL_FORM_STATE = {
    username: '',
    phone: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmitRegister = async (values) => {
    console.log('Form submitted with values:', values);
    try {
      setIsLoading(true);
      const response = await axios.post('/users/register', {
        username: values.username,
        phone: values.phone,
        password: values.password,
      });

      toast.success('Tài khoản đã được đăng ký thành công. Hãy đăng nhập để tiếp tục');
      navigate('/login');
    } catch (error) {
      toast.error('Tài khoản không thể đăng ký xin hãy kiểm tra lại thông tin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={0} style={{ height: '100vh' }}>
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
                Sign Up Now
              </Typography>

              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmitRegister}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field name="username">
                      {({ field }) => <TextField fullWidth margin="normal" label="Username" {...field} />}
                    </Field>
                    <ErrorMessage name="username" component="div" className="text-danger" />

                    <Field name="phone">
                      {({ field }) => <TextField fullWidth margin="normal" label="Phone number" {...field} />}
                    </Field>
                    <ErrorMessage name="phone" component="div" className="text-danger" />

                    <Field name="password">
                      {({ field }) => (
                        <TextField fullWidth margin="normal" label="Password" type="password" {...field} />
                      )}
                    </Field>
                    <ErrorMessage name="password" component="div" className="text-danger" />

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      sx={{ mt: 3 }}
                    >
                      {isLoading ? 'Loading...' : 'Sign Up'}
                    </Button>
                  </Form>
                )}
              </Formik>

              <ToastContainer position="top-right" autoClose={3000} />
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
