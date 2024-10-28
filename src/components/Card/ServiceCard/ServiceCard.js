import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import BookingModal from '@/components/Modal/BookingModal/BookingModal2';
import CartModal from '@/components/Modal/CartModal/CartModal';
import FinalScheduleModal from '@/components/Card/ServiceCard/FinalScheduleModal';
import Hair from '@/pages/home/img/hair.jpg';

function ServiceCard({ serviceCard }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [finalModalOpen, setFinalModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // New state for voucher

  const handleSelectService = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleNext = (data) => {
    setBookingData((prev) => [...prev, data]);
    setModalOpen(false);
    setCartModalOpen(true);
  };

  const handleRemoveService = (index) => {
    const updatedBookingData = bookingData.filter((_, i) => i !== index);
    setBookingData(updatedBookingData);
  };

  const handleOpenFinalModal = (voucher) => {
    setSelectedVoucher(voucher); // Store selected voucher
    setCartModalOpen(false);
    setFinalModalOpen(true);
  };

  const handleBackToSummary = () => {
    setFinalModalOpen(false);
    setCartModalOpen(true);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {serviceCard.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.serviceId}>
            <Card>
              <CardMedia component="img" height="140" image={Hair} alt={service.serviceName} />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {service.serviceName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
                <Typography variant="body2">
                  {service.estimateTime} min | ${service.price}
                </Typography>
                <Button onClick={() => handleSelectService(service)}>Book Now</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        onNext={handleNext}
      />

      <CartModal
        open={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        bookingData={bookingData}
        onRemoveService={handleRemoveService}
        onScheduleAppointment={(voucherId) => handleOpenFinalModal(voucherId)}
      />

      <FinalScheduleModal
        open={finalModalOpen}
        onClose={() => setFinalModalOpen(false)}
        bookingData={bookingData}
        voucherId={selectedVoucher} // Pass voucher ID
        onBack={handleBackToSummary}
      />
    </Container>
  );
}

export default ServiceCard;
