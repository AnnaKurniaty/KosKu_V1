import React, { useState, useEffect } from 'react';
import { useMediaQuery, Button, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useLocation } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import Tambah from './tambah.jsx';
import Hapus from './hapus.jsx';
import Detail from './detail.jsx';
import EditFasilitasKamar from '../kelola fasilitas/update_kamar.jsx';
import EditFasilitasUmum from '../kelola fasilitas/update_umum.jsx';
import HapusFasilitasUmum from '../kelola fasilitas/hapus_umum.jsx';
import HapusFasilitasKamar from '../kelola fasilitas/hapus_kamar.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 'auto',
    borderRadius: '1em',
};

const Inventory = () => {
    const theme = useTheme();
    const [type, setType] = useState('kamar');
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const [gedungList, setGedungList] = useState([]);
    const [fasilitasUmumList, setFasilitasUmum] = useState([]);
    const [fasilitasKamarList, setFasilitasKamar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gedungId, setGedungId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/kamar/${location.state.gedungId}`);
                const data = response.data;
                setGedungList(data.kamar || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabUmum = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/fasilitas-umum/${location.state.gedungId}`);
                const data = response.data;
                setType(data.type);
                setFasilitasUmum(data.fasilitas_umum || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabKamar = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/fasilitas-kamar-v2/${location.state.gedungId}`);
                const data = response.data;
                setType(data.type);
                setFasilitasKamar(data.fasilitas_kamar || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTab = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/kamar/${location.state.gedungId}`);
                const data = response.data;
                setType(data.type);
                setGedungList(data.kamar || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        handleTabKamar();
        handleTabUmum();
        handleTab();
    }, [location.state]);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const textStyle = { backgroundColor: theme.palette.background.alt };
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };
    const btnstyle = { margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '10em' };

    return (
        <Box m='1.5rem 2.5rem'>
            <Tambah
                gedungId={gedungId}
                style={style}
                type={type}
                fasilitasKamarList={fasilitasKamarList}
                kamarList={gedungList}
                fetchData={fetchData}
            />
            <Box sx={{ width: 'auto', typography: 'body1', border:'1px solid #69AC77' }} style={textStyle} borderRadius="0.55rem" backgroundColor="white">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root.Mui-selected': { color: theme.palette.secondary[500] } }}>
                        <TabList onChange={handleChangeTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                "& .MuiTabs-scroller": {
                                    flexGrow: 1
                                },
                                '& .MuiTabs-flexContainer': {
                                    justifyContent: 'space-around',
                                },
                            }}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: theme.palette.secondary[500],
                                }
                            }}>
                            <Tab label="Kamar" value="1" onClick={handleTab} />
                            <Tab label="Fasilitas Umum" value="2" onClick={handleTabUmum} />
                            <Tab label="Fasilitas Kamar" value="3" onClick={handleTabKamar} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                <CircularProgress />
                            </Box>
                        ) : gedungList.length === 0 ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                height="50vh"
                            >
                                <Typography variant="h6" color="red" gutterBottom>
                                    Data Kamar Tidak Tersedia!
                                </Typography>
                                <Typography variant="body1">
                                    Silakan Tambah Kamar Kos Anda.
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                mt="20px"
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                gap="20px"
                                sx={{
                                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                                }}
                            >
                                {gedungList.map(kamar => (
                                    <Box
                                        key={kamar.id_kamar}
                                        gridColumn="span 4"
                                        gridRow="span 1"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="space-between"
                                        p="1.25rem 1rem"
                                        flex="1 1 100%"
                                        backgroundColor="white"
                                        border='1px solid #69AC77'
                                        borderRadius="0.55rem"
                                        sx={{
                                            boxShadow: '3'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            alt={`${kamar.gambar_kamar}`}
                                            src={`${kamar.gambar_kamar}`}
                                            style={{ height: '150px', width: 'auto', borderRadius: '1rem' }}
                                        ></Box>
                                        <Typography variant="h5" align='center' sx={{ color: theme.palette.secondary[100] }} margin="1em 0 0" fontWeight='bold'>
                                            {kamar.nama_kamar}
                                        </Typography>
                                        <div align="center">
                                            <Detail
                                                style={style}
                                                kamar={kamar}
                                                fasilitasKamarList={fasilitasKamarList}
                                                handleTab={handleTab}
                                                gedungId={gedungId}
                                            />
                                            <Hapus
                                                style={style}
                                                id_kamar={kamar.id_kamar}
                                                fetchData={fetchData}
                                            />
                                        </div>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </TabPanel>
                    <TabPanel value="2">
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                <CircularProgress />
                            </Box>
                        ) : fasilitasUmumList.length === 0 ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                height="50vh"
                            >
                                <Typography variant="h6" color="red" gutterBottom>
                                    Data Tidak Tersedia!
                                </Typography>
                                <Typography variant="body1">
                                    Silakan Tambah Fasilitas Umum Kos Anda.
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                mt="20px"
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                gap="20px"
                                sx={{
                                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                                }}
                            >
                                {fasilitasUmumList.length > 0 && fasilitasUmumList.map(fasilitas_umum => (
                                    <Box
                                        key={fasilitas_umum.id_fasilitas_umum}
                                        gridColumn="span 4"
                                        gridRow="span 1"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="space-between"
                                        p="1.25rem 1rem"
                                        flex="1 1 100%"
                                        backgroundColor="white"
                                        border='1px solid #69AC77'
                                        borderRadius="0.55rem"
                                        sx={{
                                            boxShadow: '3'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            alt={`${fasilitas_umum.gambar_fasilitas}`}
                                            src={`${fasilitas_umum.gambar_fasilitas}`}
                                            style={{ height: '150px', width: 'auto', borderRadius: '1rem' }}
                                        ></Box>
                                        <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                            {fasilitas_umum.nama_fasilitas}
                                        </Typography>
                                        <div align="center">
                                            <EditFasilitasUmum
                                                style={style}
                                                fasilitas_umum={fasilitas_umum}
                                                handleTabUmum={handleTabUmum}
                                            />
                                            <HapusFasilitasUmum
                                                style={style}
                                                id_fasilitas_umum={fasilitas_umum.id_fasilitas_umum}
                                                handleTabUmum={handleTabUmum}
                                            />
                                        </div>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </TabPanel>
                    <TabPanel value="3">
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                <CircularProgress />
                            </Box>
                        ) : fasilitasKamarList.length === 0 ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                height="50vh"
                            >
                                <Typography variant="h6" color="red" gutterBottom>
                                    Data Tidak Tersedia!
                                </Typography>
                                <Typography variant="body1">
                                    Silakan Tambah Fasilitas Kamar Kos Anda.
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                mt="20px"
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                gap="20px"
                                sx={{
                                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                                }}
                            >
                                {fasilitasKamarList.map(fasilitas_kamar => (
                                    <Box
                                        key={fasilitas_kamar.id_fasilitas_kamar}
                                        gridColumn="span 4"
                                        gridRow="span 1"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="space-between"
                                        p="1.25rem 1rem"
                                        flex="1 1 100%"
                                        border='1px solid #69AC77'
                                        backgroundColor="white"
                                        borderRadius="0.55rem"
                                        sx={{
                                            boxShadow: '3'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            alt={`${fasilitas_kamar.gambar_fasilitas}`}
                                            src={`${fasilitas_kamar.gambar_fasilitas}`}
                                            style={{ height: '150px', width: 'auto', borderRadius: '1rem' }}
                                        ></Box>
                                        <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                            {fasilitas_kamar.nama_fasilitas}
                                        </Typography>
                                        <div align="center">
                                            <EditFasilitasKamar
                                                style={style}
                                                fasilitas_kamar={fasilitas_kamar}
                                                handleTabKamar={handleTabKamar}
                                            />
                                            <HapusFasilitasKamar
                                                style={style}
                                                id_fasilitas_kamar={fasilitas_kamar.id_fasilitas_kamar}
                                                handleTabKamar={handleTabKamar}
                                            />
                                        </div>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};

export default Inventory;

