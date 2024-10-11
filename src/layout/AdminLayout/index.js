import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slice/authSlice';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    onClick: (navigate) => navigate('/dashboard'),
  },
  {
    segment: 'service-list',
    title: 'Service List',
    icon: <DesignServicesIcon />,
    onClick: (navigate) => navigate('/service-list'),
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ children }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
}

DemoPageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

function DashboardLayoutAccount(props) {
  const { window, children } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const router = React.useMemo(() => {
    return {
      navigate,
    };
  }, [navigate]);

  return (
    <AppProvider
      session={{
        user: {
          name: user?.name || 'Bharat Kashyap',
          email: user?.email || 'bharatkashyap@outlook.com',
          image: <AccountCircleIcon />,
        },
      }}
      authentication={{
        signOut: handleLogout,
      }}
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => item.onClick(navigate),
      }))}
      branding={{
        logo: <img src="https://i.pinimg.com/564x/3d/ac/29/3dac291fd07904156ed2448c7c65dfe6.jpg" alt="Logo" />,
        title: 'Hair Salon System',
      }}
      router={router}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout>
        <DemoPageContent>{children}</DemoPageContent>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DashboardLayoutAccount;