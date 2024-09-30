import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
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
    try {
      setIsLoading(true);
      const response = await axios.post(process.env.REACT_APP_LOGIN, {
        username: values.username,
        password: values.password,
      });

      const auth = {
        token: response.data.data.jwt,
        role: response.data.data.role,
      };

      // sessionStorage.setItem('auth', JSON.stringify(auth));
      login(auth);

      // Navigate with role
      if (
        auth.role.includes('admin') ||
        auth.role.includes('manager') ||
        auth.role.includes('staff') ||
        auth.role.includes('stylist')
      ) {
        navigate('/dashboard', { replace: true });
      } else if (auth.role.includes('member')) {
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
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h2 className="fw-bold mb-5">Sign In</h2>

      <Formik initialValues={INITIAL_FORM_STATE} validationSchema={FORM_VALIDATION} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <MDBInput wrapperClass="mb-4" label="Username" id="form1" type="text" name="username" as={Field} />
            <ErrorMessage name="username" component="div" className="text-danger mb-2" />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type={showPassword ? 'text' : 'password'}
              name="password"
              as={Field}
            />
            <ErrorMessage name="password" component="div" className="text-danger mb-2" />

            <div className="d-flex justify-content-between mx-3 mb-4">
              <Link to="/forgot-password">Forgot password?</Link>
              <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                {showPassword ? 'Hide Password' : 'Show Password'}
              </div>
            </div>

            <MDBBtn className="mb-4" type="submit" disabled={isLoading || isSubmitting}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </MDBBtn>

            <div className="text-center">
              <p>
                Not a member? <Link to="/register">Register</Link>
              </p>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
          </Form>
        )}
      </Formik>
    </MDBContainer>
  );
}

export default LoginPage;
