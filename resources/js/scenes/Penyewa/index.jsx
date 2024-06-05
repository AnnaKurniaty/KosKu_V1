import { Grid,Paper, TextField, Button} from '@material-ui/core'
import { Box, useTheme, Typography } from "@mui/material";
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
                <Grid align='center'>
                  <h2 style={textStyle}>Tambah Penyewa</h2>
                </Grid>
                <form>
                    <TextField 
                    label='Nama Lengkap' 
                    fullWidth 
                    required
                    />
                    <TextField 
                    label='Alamat' 
                    fullWidth 
                    required
                    />
                    <TextField 
                    label='Nomor Telepon'
                    fullWidth 
                    required
                    />
                    <TextField 
                    label='Foto KPT'
                    type="file"
                    fullWidth 
                    required
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