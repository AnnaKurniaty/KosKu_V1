import { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useLocation } from 'react-router-dom';
import TambahGedung from './tambah.jsx';
import UpdateGedung from './update.jsx';
import HapusGedung from './hapus.jsx';
import { red } from '@mui/material/colors';

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

const Gedung = () => {
    const theme = useTheme();
    const location = useLocation();
    const [gedungList, setGedungList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.userId) {
                setUserId(location.state.userId);
                const response = await axiosClient.get(`/gedung/${location.state.userId}`);
                const data = response.data;
                setGedungList(data.gedung);
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

    const isNonMediumScreens = useMediaQuery("(min-width: 1280px)");

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Menampilkan pesan jika `gedungList` kosong
    if (gedungList.length === 0) {
        return (
            <Box m='1.5rem 2.5rem' textAlign="center">
                <TambahGedung
                userId={userId}
                style={style}
                fetchData={fetchData}
                />
                <Box
                    mt="20px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="300px"
                >
                    <Box
                        gridColumn="span 4"
                        gridRow="span 1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor="white"
                        borderRadius="0.55rem"
                    >
                        <Typography variant="h6" sx={{color:'red'}} gutterBottom>
                            Data Gedung Tidak Tersedia!
                        </Typography>
                        <Typography variant="h6">
                            Silakan Tambah Gedung Kos Anda
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box m='1.5rem 2.5rem'>
            <TambahGedung
                userId={userId}
                style={style}
                fetchData={fetchData}
            />
            <Box
                mt="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                    display: "grid",
                    gridAutoFlow: 'row',
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: "20px"
                }}
            >
                {gedungList.map(gedung => (
                    <Box
                        key={gedung.id_gedung}
                        gridColumn="span 4"
                        gridRow="span 1"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor="white"
                        borderRadius="0.55rem"
                    >
                        <img
                            alt="No-Img"
                            src={`${gedung.gambar_gedung}`}
                            style={{ borderRadius: '1rem' }}
                            height="300"
                            width="auto"
                            onClick={() => {
                                navigate(`/kelola fasilitas/${gedung.id_gedung}`, { state: { gedungId: gedung.id_gedung } });
                            }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 'auto' }}>
                                <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} margin="1em 0 0" fontWeight='bold'>
                                    {gedung.nama_gedung}
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} margin="0 0 0 0">
                                    Jumlah Kamar : {gedung.jumlah_kamar}
                                </Typography>
                            </div>

                            {/* Update Gedung */}
                            <UpdateGedung
                                style={style}
                                fetchData={fetchData}
                                gedung={gedung}
                            />

                            {/* Delete Gedung */}
                            <HapusGedung
                                style={style}
                                id_gedung={gedung.id_gedung}
                                fetchData={fetchData}
                            />
                        </div>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Gedung;
