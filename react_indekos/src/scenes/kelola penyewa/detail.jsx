import React from "react";
import { Box, useTheme, Typography, Grid,Paper, TextField, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab'
import "react-datepicker/dist/react-datepicker.css";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const paperStyle={padding :20,height:"auto",width:"auto", margin:"5rem auto", backgroundColor: theme.palette.background.alt, marginTop:0}
  const textStyle={color: theme.palette.secondary[500], align:"Left"}
  const btnstyle={margin:'2em 0', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', float:'right', width:"auto"}
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
        <Paper elevation={10} style={paperStyle}>
          <LoadingButton type='submit' style={btnstyle}
            onClick={() => {
              navigate('/kelola penyewa');
            }}>Kembali</LoadingButton>
          <br />
                <Grid align='center'>
                  <h2 style={textStyle}>Identitas Penyewa</h2>
                </Grid>
                <form>
                    <TextField 
                    label='Nama Penyewa' 
                    fullWidth 
                    required
                    value="Anna Kurniaty"
                    />
                    <TextField 
                    label='Nomor Kamar' 
                    fullWidth 
                    required
                    value="A"
                    />
                    <TextField 
                    label='Status Pembayaran'
                    fullWidth 
                    required
                    value="Lunas"
                    />
                    <TextField 
                    label='Nomor HP Penyewa'
                    fullWidth 
                    required
                    value="0882xxxxxxxx"
                    />
                    <TextField 
                    label='Alamat Penyewa'
                    fullWidth 
                    required
                    value="Maleber"
                    />
                    <TextField 
                    label='Tanggal Mulai Sewa'
                    fullWidth 
                    required
                    value="25 Maret 2024"
                    />
                    <TextField 
                    label='Jatuh Tempo Sewa'
                    fullWidth 
                    required
                    value="25 Juli 2024"
                    />
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        File Foto KTP Penyewa/ Penanggungjawab Sewa
                    </Typography>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    <LoadingButton type='submit' style={btnstyle}>Hapus</LoadingButton>
                </form>
            </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;