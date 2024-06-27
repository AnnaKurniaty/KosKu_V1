import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #69AC77',
  boxShadow: 4,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '1em'
};

const SuccessModal = ({ open, handleClose, message }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="success-modal-title"
    aria-describedby="success-modal-description"
  >
    <Box sx={{ ...style, width: 320, padding: 2 }} align="center">
      <h3 id="success-modal-title" style={{ fontWeight: 'bold' }}>Sukses</h3>
      <Typography>{message}</Typography>
      <Button
        style={{
          margin: '0.5em',
          backgroundColor: '#69AC77',
          color: "white",
          padding: '0.5em 0',
          borderRadius: '0.5em',
          width: '7em',
          height: '2em'
        }}
        onClick={handleClose}
      >
        Tutup
      </Button>
    </Box>
  </Modal>
);

export default SuccessModal;
