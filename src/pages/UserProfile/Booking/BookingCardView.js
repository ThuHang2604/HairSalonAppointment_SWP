import React from 'react';
import { Box, Typography, Card, CardContent, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookingCardView = ({ bookings }) => {
  const [anchorEl, setAnchorEl] = React.useState(null); // Control for Menu
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 3 }}>
        No bookings found.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {bookings.map((booking, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            borderBottom: '1px solid #ddd',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {booking.serviceName || 'Unknown Service'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {booking.status || 'Unknown Status'}
            </Typography>
            <Typography variant="body2">Total Price: ${booking.totalPrice}</Typography>{' '}
          </Box>

          <Box>
            <Button variant="outlined" endIcon={<MoreVertIcon />} onClick={handleMenuOpen} sx={{ minWidth: '100px' }}>
              Manage
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>Book Again</MenuItem>
              <MenuItem onClick={handleMenuClose}>Reschedule</MenuItem>
              <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
            </Menu>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default BookingCardView;
