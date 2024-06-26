import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useLocation } from 'react-router-dom';
import TambahGedung from './tambah.jsx';
import UpdateGedung from './update.jsx';
import HapusGedung from './hapus.jsx';

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
    const [gedungList, setGedungList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [userId, setUserId] = React.useState(null);
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

    React.useEffect(() => {
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
                        border='1px solid #69AC77'
                    >
                        <Typography variant="h6" sx={{ color: 'red' }} gutterBottom>
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
                    display: "grid",
                    gridTemplateColumns: isNonMediumScreens ? "repeat(3, 1fr)" : "1fr", // Mengatur jumlah kolom sesuai layar
                    gap: "20px"
                }}
            >
                {gedungList.map(gedung => (
                    <Box
                        key={gedung.id_gedung}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="1.25rem 1rem"
                        borderRadius="1rem"
                        border='1px solid #69AC77'
                        boxShadow="4"
                        sx={{
                            width: '100%', // Mengatur lebar agar setiap Box memenuhi kolom grid
                            maxWidth: isNonMediumScreens ? 'none' : '100%', // Mengatur lebar maksimal untuk layar kecil
                        }}
                    >
                        <img
                            alt="No-Img"
                            src={`${gedung.gambar_gedung}`}
                            style={{ borderRadius: '1rem', cursor: 'pointer', width: '100%' }}
                            height="250"
                            onClick={() => {
                                navigate(`/kelola fasilitas/${gedung.id_gedung}`, { state: { gedungId: gedung.id_gedung } });
                            }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                            <div style={{ marginRight: 'auto' }}>
                                <Typography variant="h5" sx={{ color: theme.palette.secondary[100], fontWeight: 'bold' }} margin="0 0 0.5rem">
                                    {gedung.nama_gedung}
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.secondary[100] }} margin="0 0 0">
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
