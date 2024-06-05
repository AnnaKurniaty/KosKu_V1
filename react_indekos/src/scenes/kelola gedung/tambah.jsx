import React, { useMemo, useState } from "react";
import { Box, useTheme, Typography, Grid,Paper, TextField, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const paperStyle={padding :20,height:"auto",width:"auto", margin:"5rem auto", backgroundColor: theme.palette.background.alt}
  const textStyle={color: theme.palette.secondary[500], align:"Left"}
  const btnstyle={margin:'2em 2em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', float:'right', width:"auto"}

  return (
    <Box m="1.5rem 2.5rem">
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
        <Paper elevation={10} style={paperStyle}>
          <LoadingButton type='submit' style={btnstyle}
            onClick={() => {
              navigate('/kelola kamar');
            }}>Kembali</LoadingButton>
          <br />
                <Grid align='center'>
                  <h2 style={textStyle}>Tambah Kamar</h2>
                </Grid>
                <form>
                    <TextField 
                    label='Nama Kamar' 
                    fullWidth 
                    required
                    value=""
                    />
                    <TextField 
                    label='Nama Gedung' 
                    fullWidth 
                    required
                    value=""
                    />
                    <TextField 
                    label='Harga'
                    fullWidth 
                    required
                    value=""
                    />
                    <TextField 
                    label='Gambar Kamar'
                    type="file"
                    fullWidth 
                    required
                    value=""
                    />
                    <LoadingButton type='submit' style={btnstyle}>Tambah</LoadingButton>
                </form>
            </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;