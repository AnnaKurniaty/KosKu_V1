import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useTheme, Box, Grid, Paper, TextField, InputAdornment, IconButton, Link, Modal, Typography, Button } from '@mui/material';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../../context/ContextProvider";
import logoImage from "../../asset/logo.png";
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

const Login = () => {
  const theme = useTheme();
  const [nomor_telepon, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [openModal, setOpenModal] = useState(false); // State untuk mengontrol visibilitas modal
  const [verifyingUser, setVerifyingUser] = useState(false); // State untuk menunjukkan status verifikasi pengguna
  const [namaLengkap, setNamaLengkap] = useState(""); // State untuk menyimpan nama lengkap pengguna
  const [nomorTelepon, setNomorTelepon] = useState(""); // State untuk menyimpan nomor telepon pengguna
  const [email, setEmail] = useState(""); // State untuk menyimpan email
  const [resettingPassword, setResettingPassword] = useState(false); // State untuk menunjukkan status mengatur ulang password
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const openError = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setVerifyingUser(false); // Reset status verifikasi saat menutup modal
    setResettingPassword(false); // Reset status reset password saat menutup modal
  };

  const submitHandle = (ev) => {
    ev.preventDefault();
    const payload = {
      nomor_telepon,
      password,
    };
    setLoading(true);
    axiosClient.post("/login", payload)
      .then(({ data }) => {
        console.log("Login successful: ", data);
        localStorage.setItem('token', data.authorisation.token);
        setToken(data.authorisation.token);
        setUser(data.user);
        const userId = data.user.id;
        setUserId(userId);
        navigate(`/informasi kos/${userId}`);
      })
      .catch(err => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        openError('Pastikan Semua Terisi Dengan Benar');
      });
  };

  const closeError = () => {
    setOpenErrorModal(false);
  };
  
  const handleForgotPassword = () => {
    setLoading(true);

    axiosClient.post("/verify-user", { nomor_telepon: nomorTelepon })
      .then(({ data }) => {
        setLoading(false);
        setVerifyingUser(true);
        setUserId(data.userId); 
      })
      .catch(err => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 404) {
          setErrors({ general: 'Pengguna tidak ditemukan!' });
        } else {
          setErrors({ general: 'Terjadi kesalahan saat verifikasi pengguna.' });
        }
      });
  };  

  const handleResetPassword = (ev) => {
    ev.preventDefault();
    const payload = {
      email,
      password,
    };
    setLoading(true);
    axiosClient.put(`/reset-password/${userId}`, payload)
      .then(({ data }) => {
        setLoading(false);

        console.log("Password berhasil diubah: ", data);
        handleCloseModal();
      })
      .catch(err => {
        setLoading(false);

        console.error("Gagal mengubah password: ", err);
      });
  };

  const paperStyle = { padding: 20, height: "auto", width: 300, backgroundColor: theme.palette.background.alt, borderRadius: '3rem', borderColor: '#69AC77', borderStyle: 'solid', position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', };
  const btnstyle = { backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };
  const btnstyle1 = { margin: '1em 0 1em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };

  return (
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
        {errors.general && (
          <div className="alert alert-danger">
            {errors.general}
          </div>
        )}
        <form onSubmit={submitHandle}>
          <TextField
            label='Nomor Telepon'
            variant='standard'
            color='warning'
            fullWidth
            value={nomor_telepon}
            onChange={(v) => setNomor(v.target.value)}
            error={!!errors["nomor_telepon"]}
            helperText={errors["nomor_telepon"]}
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
            variant='standard'
            type={showPassword ? "text" : "password"}
            color='warning'
            fullWidth
            value={password}
            onChange={(v) => setPassword(v.target.value)}
            error={!!errors["password"]}
            helperText={errors["password"]}
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
          <h5 align='center'>
            <Link style={{color:'black'}} onClick={handleOpenModal}>Lupa Password?</Link>
          </h5>
          <div align="center">
            <LoadingButton type='submit' style={btnstyle} loading={loading}>Masuk</LoadingButton>
          </div>
          <h4 align='center'>Belum punya akun? <Link style={{ color: 'black' }} onClick={() => {
              navigate('/register');
            }}>Daftar</Link></h4>
        </form>
      </Paper>

      <Modal
        open={openErrorModal}
        onClose={closeError}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={{ ...style, width: 320, padding: 2 }} align="center">
          <Typography variant="h6" id="success-modal-title" style={{ fontWeight: 'bold' }}>Error</Typography>
          <Typography>{errorMessage}</Typography>
          <Button style={{ margin: '0.5em', backgroundColor: '#FF0000', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={closeError}>Tutup</Button>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-lupa-password-title"
        aria-describedby="modal-lupa-password-description"
      >
      <Paper elevation={10} style={{ ...paperStyle, width: 400 }}>
      {!verifyingUser && !resettingPassword && (
        <>
        <h2 id="modal-lupa-password-title" align="center">Lupa Password</h2>
        <form>
          <TextField
            label='Nomor Telepon'
            variant='standard'
            color='warning'
            fullWidth
            required
            value={nomorTelepon}
            onChange={(v) => setNomorTelepon(v.target.value)}
            InputLabelProps={{
              style: { color: "black" }
            }}
            InputProps={{
              style: { color: "black" },
            }}
          />
          <div align="center">
            <LoadingButton type='submit' style={btnstyle1} loading={loading} onClick={handleForgotPassword}>Verifikasi</LoadingButton>
          </div>
        </form>
        </>
      )}
      {verifyingUser && (
      <>
        <h2 id="modal-lupa-password-title" align="center">Ubah Password</h2>
          <form onSubmit={handleResetPassword}>
            <TextField
              label='Email'
              variant='standard'
              color='warning'
              fullWidth
              required
              value={email}
              onChange={(v) => setEmail(v.target.value)}
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              label='Password Baru'
              variant='standard'
              type={showPassword ? "text" : "password"}
              color='warning'
              fullWidth
              required
              value={password}
              onChange={(v) => setPassword(v.target.value)}
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
        <LoadingButton type='submit' style={btnstyle1} loading={loading}>Simpan</LoadingButton>
        </div>
        </form>
        </>
      )}
      </Paper>
    </Modal>
  </Grid>
);
};

export default Login;