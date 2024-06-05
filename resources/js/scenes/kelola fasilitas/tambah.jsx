import { useState } from "react";
import { Grid,Paper, TextField} from '@material-ui/core'
import { Box, useTheme} from "@mui/material";
import { LoadingButton } from '@mui/lab'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dateOfBuy, setDateOfBuy] = useState('')
  const paperStyle={padding :20,height:"auto",width:"auto", margin:"5rem auto", backgroundColor: theme.palette.background.alt}
  const textStyle={color: theme.palette.secondary[500], align:"Left"}
  const btnstyle={margin:'2em 2em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', float:'center', width:"auto"}
  const btnstyle1={margin:'2em 2em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', float:'right', width:"auto"}

  return (
    <Box m="1.5rem 2.5rem">
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
        <Paper elevation={10} style={paperStyle}>
          <LoadingButton type='submit' style={btnstyle1}
            onClick={() => {
              navigate('/kelola fasilitas');
            }}>Kembali</LoadingButton>
          <br />
                <Grid align='center'>
                  <h2 style={textStyle}>Tambah Fasilitas</h2>
                </Grid>
                <form>
                    <TextField 
                    label='Nama Fasilitas' 
                    fullWidth 
                    required
                    value=""
                    />
                    <TextField 
                    label='Status' 
                    fullWidth 
                    required
                    value=""
                    style={{marginBottom:'20px'}}
                    />
                    <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Tanggal Pembelian"
                    onChange={e => setDateOfBuy(e.target.value)}
                    value={dateOfBuy}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                    <TextField 
                    label='Biaya Perawatan'
                    fullWidth 
                    required
                    value=""
                    style={{marginBottom:'20px'}}
                    />
                    <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Tanggal Perawatan"
                    onChange={e => setDateOfBuy(e.target.value)}
                    value={dateOfBuy}
                    fullWidth
                    required
                    sx={{mb: 4}}
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