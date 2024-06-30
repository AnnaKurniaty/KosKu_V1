import { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery,Paper, TextField, Typography,CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useLocation } from 'react-router-dom';
import Edit from './update.jsx';
import logoImage from "../../asset/profile.jpeg";
import { BorderColor } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 'auto',
    borderRadius: '1em'
};

const Pemilik = () => {
    const theme = useTheme();
    const paperStyle = { padding: 20, height: "400px", width: "auto", margin: "100px auto 25px auto", backgroundColor: theme.palette.background.alt, borderRadius: '3em', borderColor: '#69AC77', borderStyle: 'solid' };
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
   
    const fetchData = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.userId) {
                setUserId(location.state.userId);
                const response = await axiosClient.get(`/user`);
                const data = response.data;
                setUser(data);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.state]);

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m="1.5rem 2.5rem">
            <Paper style={paperStyle}>
            {!loading && user && (
                <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ color: theme.palette.secondary[100] }} 
                    align="center" 
                    fontWeight="bold"
                  >
                    Profil Akun
                  </Typography>
                </Box>
                <Box mt="1rem" mb="20px">
                  <img
                    alt="No-Img"
                    src={logoImage}
                    style={{ borderRadius: '1rem' }}
                    height="50"
                    width="auto"
                  />
                </Box>
                <form>
                    <TextField
                    label='Nama Lengkap'
                    variant='standard'
                    color='warning'
                    fullWidth
                    value={user.nama_lengkap}
                    InputProps={{
                        readOnly: true,
                      }}
                    name='nama_lengkap'
                    InputLabelProps={{
                        style: { color: "black" }
                    }}
                    />
                    <TextField
                    label='Alamat Penyewa'
                    variant='standard'
                    color='warning'
                    fullWidth
                    value={user.alamat_pemilik}
                    InputProps={{
                        readOnly: true,
                      }}
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
                    value={user.nomor_telepon}
                    InputProps={{
                        readOnly: true,
                      }}
                    name='nomor_telepon'
                    InputLabelProps={{
                        style: { color: "black" }
                    }}
                    />
                    <TextField
                    label='Password'
                    variant='standard'
                    color='warning'
                    fullWidth
                    value="••••••••••" // Tampilkan placeholder atau karakter tersembunyi
                    InputProps={{
                        readOnly: true,
                    }}
                    name='password'
                    InputLabelProps={{
                        style: { color: "#333333" }
                    }}
                    />
                    <div align="center">
                    <Edit
                        style={style}
                        user={user}
                        fetchData={fetchData}
                        userId={user.id}
                    />
                    </div>
                </form>
            </Box>
            )}
        </Paper>
    </Box>
    )
}

export default Pemilik
