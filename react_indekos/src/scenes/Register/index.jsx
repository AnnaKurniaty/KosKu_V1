import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useTheme, Box, Grid, Paper, InputAdornment, TextField, IconButton, Link, Modal, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosClient from '../../axios-client';
import { useSelector } from 'react-redux';
import logoImage from '../../asset/logo.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [nama_lengkap, setNama] = useState("");
  const [alamat_pemilik, setAlamat] = useState("");
  const [nomor_telepon, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openSuccess = (message) => {
    setSuccessMessage(message);
    setOpenSuccessModal(true);
  };

  const closeSuccess = () => {
    navigate('/login');
  };

  const openError = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
  };

  const closeError = () => {
    setOpenErrorModal(false);
  };

  const validateFields = () => {
    if (!nama_lengkap || !alamat_pemilik || !nomor_telepon || !password) {
      return false;
    }
    return true;
  };

  const submitHandle = (ev) => {
    ev.preventDefault();
    if (!validateFields()) {
      openError('Pastikan Semua Terisi Dengan Benar.');
      return;
    }

    const payload = {
      nama_lengkap: nama_lengkap,
      alamat_pemilik: alamat_pemilik,
      nomor_telepon: nomor_telepon,
      password: password,
    };
    axiosClient.post("/register", payload).then(data => {
      openSuccess('Berhasil menambahkan Pemilik');
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    });
  };

  const loading = useSelector((state) => state.global.loading);
  const textStyle1 = { marginTop: '0' };
  const paperStyle = { padding: 20, height: "auto", width: 300, backgroundColor: theme.palette.background.alt, borderRadius: '3rem', borderColor: '#69AC77', borderStyle: 'solid' };
  const btnstyle = { margin: '2em 0', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Box
              component="img"
              alt="logo"
              src={logoImage}
              height="98px"
              width="134px"
              marginBottom={'2rem'}
            />
          </Grid>
          <form onSubmit={submitHandle}>
            <TextField
              label='Nama Lengkap'
              value={nama_lengkap}
              onChange={(v) => setNama(v.target.value)}
              error={!!errors["nama_lengkap"]}
              helperText={errors["nama_lengkap"]}
              variant='standard'
              color='warning'
              fullWidth
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: {
                  color: "black"
                },
              }}
            />
            <TextField
              label='Alamat'
              value={alamat_pemilik}
              onChange={(v) => setAlamat(v.target.value)}
              error={!!errors["alamat_pemilik"]}
              helperText={errors["alamat_pemilik"]}
              variant='standard'
              color='warning'
              fullWidth
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: {
                  color: "black"
                },
              }}
            />
            <TextField
              label='Nomor Telepon'
              value={nomor_telepon}
              onChange={(v) => setNomor(v.target.value)}
              error={!!errors["nomor_telepon"]}
              helperText={errors["nomor_telepon"]}
              variant='standard'
              color='warning'
              fullWidth
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: {
                  color: "black"
                },
              }}
            />
            <TextField
              label='Password'
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(v) => setPassword(v.target.value)}
              error={!!errors["password"]}
              helperText={errors["password"]}
              fullWidth
              variant='standard'
              color='warning'
              InputLabelProps={{
                style: { color: "black" },
              }}
              style={{
                color: "black",
                marginTop: '.4rem'
              }}
              InputProps={{
                style: {
                  color: "black"
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div align="center">
              <LoadingButton type='submit' style={btnstyle} loading={loading}>Daftar</LoadingButton>
            </div>
            <h4 style={textStyle1} align='center'>Sudah punya akun? <Link style={{ color: 'black' }} onClick={() => {
              navigate('/login');
            }}>Login</Link></h4>
          </form>
        </Paper>
      </Grid>

      <Modal
        open={openSuccessModal}
        onClose={closeSuccess}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={{ ...style, width: 320, padding: 2 }} align="center">
          <h3 id="success-modal-title" style={{ fontWeight: 'bold' }}>Sukses</h3>
          <Typography>{successMessage}</Typography>
          <Button style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={closeSuccess}>Tutup</Button>
        </Box>
      </Modal>

      <Modal
        open={openErrorModal}
        onClose={closeError}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box sx={{ ...style, width: 320, padding: 2 }} align="center">
          <h3 id="error-modal-title" style={{ fontWeight: 'bold' }}>Error</h3>
          <Typography>{errorMessage}</Typography>
          <Button style={{ margin: '0.5em', backgroundColor: '#FF0000', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={closeError}>Tutup</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Register;
