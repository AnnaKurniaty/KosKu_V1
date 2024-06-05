import { Grid,Paper, TextField, Button} from '@material-ui/core'
import { Box, useTheme, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import kasur from "../../asset/kasur.jpg";

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
              navigate('/kelola fasilitas');
            }}>Kembali</LoadingButton>
          <br />
                <Grid align='center'>
                  <h2 style={textStyle}>Detail Fasilitas</h2>
                </Grid>
                <Grid align='center'>
                  <Box
                    component="img"
                    alt="kasur"
                    src={kasur}
                    height="50%"
                    width="50%"
                    ></Box>
                </Grid>
                <form>
                    <TextField 
                    label='Nama Fasilitas' 
                    fullWidth 
                    required
                    value="Lemari"
                    />
                    <TextField 
                    label='Status' 
                    fullWidth 
                    required
                    value="Baik"
                    />
                    <TextField 
                    label='Tanggal Pembelian/ Pembuatan'
                    fullWidth 
                    required
                    value="10 Oktober 2010"
                    />
                    <TextField 
                    label='Biaya Perawatan'
                    fullWidth 
                    required
                    value="100.000"
                    />
                    <TextField 
                    label='Tanggal Perawatan/ Perbaikan Terakhir'
                    fullWidth 
                    required
                    value="19 Agustus 2020"
                    />
                    <LoadingButton type='submit' style={btnstyle}>Edit</LoadingButton>
                    <LoadingButton type='submit' style={btnstyle}>Hapus</LoadingButton>
                </form>
            </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;