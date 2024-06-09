import React, { useState, useEffect } from 'react'
import { Box, useTheme, useMediaQuery, Typography, CircularProgress, Button} from '@mui/material'
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import QRCode from 'react-qr-code';
import DetailPenyewa from './detail.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '1em'
  };

  export default function Penyewa() {
    const theme = useTheme()
    const location = useLocation();
    const [penyewaList, setPenyewaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.userId) {
                setUserId(location.state.userId);
                const response = await axiosClient.get(`/kelola-penyewa/${location.state.userId}`);
                const data = response.data;
                setPenyewaList(data.penyewa);
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

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen1 = () => {
        setOpen1(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const btnstyle = { margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m='1.5rem 2.5rem'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                <Box marginLeft="-20px">
                    <Typography
                    variant='h5'
                    color='white'
                    fontWeight='bold'
                    sx={{ mb: '5px' }}
                    >
                    Daftar Penyewa Kos
                    </Typography>
                </Box>
                <Button type='submit' style={btnstyle} onClick={handleOpen1}>Tambah</Button>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }} align="center">
                        <h2 id="parent-modal-title">Tambah Penyewa</h2>
                        <p id="parent-modal-description">
                            <QRCode
                                value="http://localhost:3000/penyewa"
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                            />
                        </p>
                    </Box>
                </Modal>
            </div>
            {penyewaList.map(penyewa => (
                <Box
                    key={penyewa.id_penyewa}
                    mt="20px"
                    display="grid"
                    gap="15px"
                    marginLeft="-20px"
                    marginRight="-20px"
                >
                    <Box
                    gridColumn="span 4"
                    gridRow="span 1"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p="1.25rem 1rem"
                    flex="1 1 100%"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                    padding={1}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <img
                                    alt="No-Img"
                                    src={`${penyewa.foto_ktp}`}
                                    height="auto"
                                    width="70"
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'8px' }}>
                                <Typography variant="caption" sx={{ color: theme.palette.secondary[100] }} fontWeight='bold' >
                                    {penyewa.nama_lengkap}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.secondary[100] }}>
                                    Status Penyewa: {penyewa.status_penyewa}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.secondary[100] }}>
                                    {penyewa.nama_kamar}
                                </Typography>
                            </div>
                            <div>
                                <DetailPenyewa 
                                    style={style}
                                    fetchData={fetchData}
                                    penyewa={penyewa}
                                />
                            </div>
                        </div>
                    </Box>
                </Box>
                ))}
        </Box>
    );
}

