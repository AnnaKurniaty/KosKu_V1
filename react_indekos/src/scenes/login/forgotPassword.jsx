import React, { useState } from 'react';
import { useTheme, Box, Grid, Paper, TextField, Button } from '@mui/material';
import axiosClient from '../../axios-client';
import logoImage from "../../asset/logo.png";

const ForgotPassword = () => {
  const theme = useTheme();
  const [nomor_telepon, setNomor] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient.post("/forgot-password", { nomor_telepon })
      .then(response => {
        setLoading(false);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      })
      .catch(error => {
        setLoading(false);
        setSuccessMessage("");
        setErrorMessage(error.response.data.error || "Terjadi kesalahan. Silakan coba lagi.");
      });
  };

  const paperStyle = { padding: 20, height: "auto", width: 300, margin: "9rem auto", backgroundColor: theme.palette.background.alt, borderRadius: '3rem' };
  const btnstyle = { margin: '2em 0 0', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em' };

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
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleResetPassword}>
          <TextField
            label='Nomor Telepon'
            variant='standard'
            color='warning'
            fullWidth
            required
            value={nomor_telepon}
            onChange={(v) => setNomor(v.target.value)}
            InputLabelProps={{
              style: { color: "black" }
            }}
            InputProps={{
              style: {
                color: "black"
              },
            }}
          />
          <div align="center">
            <Button type='submit' style={btnstyle} disabled={loading}>
              {loading ? 'Loading...' : 'Reset Password'}
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
