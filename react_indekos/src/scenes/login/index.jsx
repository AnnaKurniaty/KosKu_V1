import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useTheme, Box, Grid, Paper, TextField, InputAdornment, IconButton } from '@mui/material';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../../context/ContextProvider";
import logoImage from "../../asset/logo.png";
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        navigate(`/informasi kos/${userId}`, { state: { userId } }); 
      })
      .catch(err => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        if (response && response.status === 401) {
          setErrors({ general: 'Nomor telepon atau password salah!!' });
        }
      });
  };

  const paperStyle = { padding: 20, height: "auto", width: 300, margin: "9rem auto", backgroundColor: theme.palette.background.alt, borderRadius: '3rem' };
  const textStyle1 = { margin: '-20' };
  const btnstyle = { margin: '2em 0 0', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };
  const btnstyle1 = { margin: '0 0 1em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };

  return (
    <Grid>
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
            required
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
            required
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
          <div align="center">
            <LoadingButton type='submit' style={btnstyle} loading={loading}>Masuk</LoadingButton>
          </div>
          <h4 style={textStyle1} align='center'>Belum punya akun?</h4>
          <div align="center">
            <LoadingButton style={btnstyle1} onClick={() => {
              navigate('/register');
            }}>Daftar</LoadingButton>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
