import React, { useState, useEffect } from 'react';
import { useMediaQuery,Button, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import Tambah from './tambah.jsx';
import Detail from './detail.jsx';
import Hapus from './hapus.jsx';
import DetailFasilitasKamar from '../kelola fasilitas/detail_kamar.jsx';
import DetailFasilitasUmum from '../kelola fasilitas/detail_umum.jsx';
import HapusFasilitas from '../kelola fasilitas/hapus.jsx';

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
  

const Inventory = () => {
    const theme = useTheme()
    const [type, setType] = useState('');
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
                setType(data.type);
                setGedungList(data.kamar || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabUmum  = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/fasilitas umum/${location.state.gedungId}`);
                const data = response.data;
                setType(data.type);
                setFasilitasUmum(data.fasilitas || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleTabKamar  = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/fasilitas kamar/${location.state.gedungId}`);
                const data = response.data;
                setType(data.type);
                setFasilitasKamar(data.fasilitas || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTab  = async () => {
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
        handleTabUmum();
        handleTabKamar();
        handleTab();
    }, [location.state]);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const textStyle={backgroundColor:theme.palette.background.alt}
    const btnstyle1={margin:'0.2em', backgroundColor:'#FF9900', color:"white", borderRadius: '0.5em'}
    const btnstyle={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
    return (
        <Box m='1.5rem 2.5rem'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Tambah
                    gedungId={gedungId}
                    style={style}
                    handleTab={handleTab}
                    handleTabKamar={handleTabKamar}
                    handleTabUmum={handleTabUmum}
                />
            </div>
            <Box sx={{ width: 'auto', typography: 'body1' }} style={textStyle} borderRadius="0.55rem" backgroundColor="white">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root.Mui-selected': {
                        color:theme.palette.secondary[500],
                        }, }}>
                    <TabList onChange={handleChangeTab}
                    TabIndicatorProps={{
                        style: {
                        backgroundColor:theme.palette.secondary[500],
                        }
                    }}>
                        <Tab label="Tipe Kamar" value="1" onClick={() => handleTab()}/>
                        <Tab label="Fasilitas Umum" value="2" onClick={() => handleTabUmum()} />
                        <Tab label="Fasilitas Kamar" value="3" onClick={() => handleTabKamar()}/>
                    </TabList>
                    </Box>
                    <TabPanel value="1">
                        {gedungList.length > 0 && gedungList.map(kamar => (
                        <Box
                            key={kamar.id_kamar}
                            mt="20px"
                            display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gap="20px"
                            sx={{
                            "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                            }}
                            >
                            <Box
                            gridColumn="span 4"
                            gridRow="span 1"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            p="1.25rem 1rem"
                            flex="1 1 100%"
                            backgroundColor="white"
                            borderRadius="0.55rem"
                            sx={{
                                boxShadow: '3'
                            }}
                            >
                            <Box
                                component="img"
                                alt={`${kamar.gambar_kamar}`}
                                src={`${kamar.gambar_kamar}`}
                                style={{ height: '200px', width: 'auto', borderRadius:'1rem' }}
                            ></Box>
                                <Typography variant="h5" align='center' sx={{ color: theme.palette.secondary[100] }} margin="1em 0 0" fontWeight='bold'>
                                {kamar.nama_kamar}
                                </Typography>
                                <div align="center">
                                    <Detail
                                        style={style}
                                        kamar={kamar}
                                        fetchData={fetchData}
                                        handleTabKamar={handleTabKamar}
                                    />
                                    <Hapus 
                                        style={style}
                                        id_kamar={kamar.id_kamar}
                                        fetchData={fetchData}
                                    />
                                </div>
                        </Box>
                    </Box>
                    ))}
                    </TabPanel>
                    <TabPanel value="2">
                    {fasilitasUmumList.length > 0 && fasilitasUmumList.map(fasilitas => (
                    <Box
                        key={fasilitas.id_fasilitas}
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        sx={{
                        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                        }}
                    >
                        <Box
                        gridColumn="span 4"
                        gridRow="span 1"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        sx={{
                            boxShadow: '3'
                        }}
                        >
                            <Box
                                component="img"
                                alt={`${fasilitas.gambar_fasilitas}`}
                                src={`${fasilitas.gambar_fasilitas}`}
                                style={{ height: '200px', width: 'auto', borderRadius:'1rem' }}
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                {fasilitas.nama_fasilitas}
                            </Typography>
                            <div align="center">
                                <DetailFasilitasUmum
                                        style={style}
                                        fasilitas={fasilitas}
                                        handleTabUmum={handleTabUmum}
                                    />
                                    <HapusFasilitas
                                        style={style}
                                        id_fasilitas={fasilitas.id_fasilitas}
                                        handleTabUmum={handleTabUmum}
                                    />
                            </div>
                        </Box>
                    </Box>
                    ))}
                    </TabPanel>
                    <TabPanel value="3">
                    {fasilitasKamarList.length > 0 && fasilitasKamarList.map(fasilitas => (
                    <Box
                        key={fasilitas.id_fasilitas}
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        sx={{
                        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                        }}
                    >
                        <Box
                        gridColumn="span 4"
                        gridRow="span 1"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        sx={{
                            boxShadow: '3'
                        }}
                        >
                            <Box
                                component="img"
                                alt={`${fasilitas.gambar_fasilitas}`}
                                src={`${fasilitas.gambar_fasilitas}`}
                                style={{ height: '200px', width: 'auto', borderRadius:'1rem' }}
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                {fasilitas.nama_fasilitas}
                            </Typography>
                            <div align="center">
                                    <DetailFasilitasKamar
                                        style={style}
                                        fasilitas={fasilitas}
                                        handleTabKamar={handleTabKamar}
                                    />
                                    <HapusFasilitas
                                        style={style}
                                        id_fasilitas={fasilitas.id_fasilitas}
                                        handleTabKamar={handleTabKamar}
                                    />
                            </div>
                        </Box>
                    </Box>
                    ))}
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
  );
};
export default Inventory;