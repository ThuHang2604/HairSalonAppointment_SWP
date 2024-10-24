import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartModal = ({ open, onClose, bookingData, onRemoveService, onScheduleAppointment }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Appointment Summary
        </Typography>
        <List>
          {bookingData.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveService(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${item.service.serviceName} with ${item.stylist.stylistName}`}
                secondary={`${item.service.estimateTime} min | $${item.service.price}`}
              />
            </ListItem>
          ))}
        </List>
        <Button onClick={onClose} sx={{ marginTop: 2 }} variant="text" color="primary">
          + Add Service
        </Button>
        <Button onClick={onScheduleAppointment} sx={{ marginTop: 2 }} variant="contained" color="primary">
          Schedule Appointment
        </Button>
      </Box>
    </Modal>
  );
};

export default CartModal;
