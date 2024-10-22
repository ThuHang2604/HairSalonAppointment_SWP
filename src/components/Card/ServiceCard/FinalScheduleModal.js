import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { getUserProfileCurrent } from '@/redux/slice/userProfileSlice';
import { getScheduleList } from '@/api/ScheduleApi';
import { createBooking } from '@/api/BookingApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const FinalScheduleModal = ({ open, onClose, bookingData, onBack }) => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const actionResult = await dispatch(getUserProfileCurrent());
        if (getUserProfileCurrent.fulfilled.match(actionResult)) {
          const userData = actionResult.payload;
          setUserName(userData.fullName);
          setPhone(userData.phone);
        } else {
          console.error('Failed to fetch user profile:', actionResult.error.message);
          toast.error('Unable to load user profile. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Error fetching user profile.');
      } finally {
        setLoadingUser(false);
      }
    };

    if (open) {
      fetchUserProfile();
    }
  }, [dispatch, open]);

  // Fetch schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedules = await getScheduleList();
        setSchedules(schedules.data);
      } catch (error) {
        console.error('Failed to fetch schedule list:', error);
        toast.error('Unable to load schedules. Please try again.');
      } finally {
        setLoadingSchedules(false);
      }
    };

    if (open) {
      fetchSchedules();
    }
  }, [open]);

  const handleBookNow = async () => {
    const dataToSave = {
      userName,
      phone,
      voucherId: null,
      scheduleId: selectedSchedule,
      serviceId: bookingData.map((item) => item.service.serviceId),
      stylistId: bookingData.map((item) => item.stylist.stylistId),
    };

    try {
      await createBooking(dataToSave);
      toast.success(
        'Your booking request has been sent successfully. Please wait for appointment confirmation from Salon.',
      );
      onClose(); // Close the modal on success
    } catch (error) {
      console.error('Booking Error:', error);
      toast.error('Failed to send booking request. Please try again.');
    }
  };

  if (loadingUser || loadingSchedules) {
    return (
      <Modal open={open} onClose={onClose} closeAfterTransition>
        <Box className="modal-box">
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Confirm Your Appointment
        </Typography>

        {/* User Name and Phone */}
        <TextField label="Name" value={userName} fullWidth margin="normal" disabled />
        <TextField label="Phone" value={phone} fullWidth margin="normal" disabled />

        {/* Selected Services */}
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
          Selected Services
        </Typography>
        <List>
          {bookingData.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.service.serviceName} with ${item.stylist.stylistName}`}
                secondary={`${item.service.estimateTime} min | $${item.service.price}`}
              />
            </ListItem>
          ))}
        </List>

        {/* Schedule Selection */}
        <Select
          value={selectedSchedule}
          onChange={(e) => setSelectedSchedule(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="" disabled>
            Select a schedule
          </MenuItem>
          {schedules.map((schedule) => (
            <MenuItem key={schedule.scheduleId} value={schedule.scheduleId}>
              {`From ${schedule.startTime} to ${schedule.endTime} on ${new Date(
                schedule.startDate,
              ).toLocaleDateString()}`}
            </MenuItem>
          ))}
        </Select>

        {/* Buttons: Back and Confirm */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="text" color="primary" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleBookNow} variant="contained" color="primary" disabled={!selectedSchedule}>
            Confirm Appointment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FinalScheduleModal;
