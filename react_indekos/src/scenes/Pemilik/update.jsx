import React, { useState } from "react";
import { Box, Button, Modal, TextField, IconButton, InputAdornment } from "@mui/material";
import axiosClient from "../../axios-client";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const Update = ({ user, style, fetchData, userId }) => {
  const [formData, setFormData] = useState({
    nama_lengkap: user.nama_lengkap,
    alamat_pemilik: user.alamat_pemilik,
    nomor_telepon: user.nomor_telepon,
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Konfirmasi password tidak sesuai');
      setOpenErrorModal(true);
      return;
    }

    const data = {
      nama_lengkap: formData.nama_lengkap,
      alamat_pemilik: formData.alamat_pemilik,
      nomor_telepon: formData.nomor_telepon,
    };

    if (formData.password) {
      data.password = formData.password;
      data.password_confirmation = formData.confirmPassword;
    }

    try {
      const response = await axiosClient.post(`/edit-pemilik/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      setSuccessMessage('Data pemilik berhasil diubah');
      setOpenSuccessModal(true);
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error:', error.response.data.errors);
      setErrorMessage('Gagal mengubah data pemilik');
      setOpenErrorModal(true);
    }
  };

  return (
    <>
      <Button style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 320, padding: 2, border: '1px solid #69AC77' }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Update Pemilik</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Nama Lengkap'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nama_lengkap}
              onChange={handleChange}
              name='nama_lengkap'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Alamat Pemilik'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.alamat_pemilik}
              onChange={handleChange}
              name='alamat_pemilik'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Nomor telepon'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nomor_telepon}
              onChange={handleChange}
              name='nomor_telepon'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Password Baru'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.password}
              onChange={handleChange}
              name='password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "black" }
              }}
            />
            <TextField
              label='Ulangi Password Baru'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              name='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "black" }
              }}
            />
            <div align="center">
              <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Ya, Simpan</Button>
              <Button type='button' style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} onClick={handleClose}>Kembali</Button>
            </div>
          </form>
        </Box>
      </Modal>
      <SuccessModal
        open={openSuccessModal}
        handleClose={() => setOpenSuccessModal(false)}
        message={successMessage}
      />
      <ErrorModal
        open={openErrorModal}
        handleClose={() => setOpenErrorModal(false)}
        message={errorMessage}
      />
    </>
  );
}

export default Update;
