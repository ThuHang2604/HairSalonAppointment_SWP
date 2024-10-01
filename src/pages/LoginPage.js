import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useAxios from '@/hooks/useAxios';
import useAuth from '@/hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const axios = useAxios();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const INITIAL_FORM_STATE = {
    username: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values) => {
    console.log('Form submitted with values:', values);

    try {
      setIsLoading(true);
      const response = await axios.post('/users/Login', {
        username: values.username,
        password: values.password,
      });

      const auth = {
        token: response.data.data.jwt,
        role: response.data.data.role,
      };

      login(auth);

      if (auth.role.includes('admin') || auth.role.includes('manager')) {
        navigate('/dashboard', { replace: true });
      } else if (auth.role.includes('customer')) {
        navigate('/', { replace: true });
      } else {
        toast.error('Tài khoản không được phép đăng nhập vào hệ thống');
      }
    } catch (error) {
      toast.error('Đăng nhập không thành công! Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3}>
        <Typography variant="h4" mb={5} fontWeight="bold">
          Log In
        </Typography>

        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Field name="username">
                {({ field }) => <TextField fullWidth margin="normal" label="Username" variant="outlined" {...field} />}
              </Field>
              <ErrorMessage name="username" component="div" className="text-danger" />

              <Field name="password">
                {({ field }) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage name="password" component="div" className="text-danger" />

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Link to="/forgot-password">Forgot password?</Link>
                <Typography onClick={handleClick} sx={{ cursor: 'pointer' }} color="primary">
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading || isSubmitting}
                sx={{ mt: 3 }}
              >
                {isLoading ? 'Loading...' : 'Log In'}
              </Button>

              <Box textAlign="center" mt={3}>
                <Typography>
                  Not a member? <Link to="/register">Sign Up</Link>
                </Typography>
              </Box>

              <ToastContainer position="top-right" autoClose={3000} />
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default LoginPage;
