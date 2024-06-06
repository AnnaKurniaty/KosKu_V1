import React, { useState, useEffect } from 'react';
import { useMediaQuery,Button, Typography, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import axiosClient from "../../axios-client.js";

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
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const [gedungList, setGedungList] = useState([]);
    const [fasilitasUmumList, setFasilitasUmum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gedungId, setGedungId] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
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

        fetchData();
    }, [location.state]);
    console.log('location.state', location.state);

    const handleTabUmum  = async () => {
        setLoading(true);
        try {
            if (location.state && location.state.gedungId) {
                setGedungId(location.state.gedungId);
                const response = await axiosClient.get(`/fasilitas umum/${location.state.gedungId}`);
                const data = response.data;
                setFasilitasUmum(data.fasilitasUmum || []);
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen1 = () => {
        setOpen1(true);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleClose = () => {
        setOpen(false),
        setOpen1(false),
        setOpen2(false);
    };
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const textStyle={backgroundColor:theme.palette.background.alt}
    const btnstyle1={margin:'0.2em', backgroundColor:'#FF9900', color:"white", borderRadius: '0.5em'}
    const btnstyle2={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}
    const btnstyle={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
    return (
        <Box m='1.5rem 2.5rem'>
                <Box marginBottom={2}>
                    <Typography
                    variant='h5'
                    color='white'
                    fontWeight='bold'
                    sx={{ mb: '5px' }}
                    >
                        Daftar Fasilitas Kos
                    </Typography>
                </Box>
            <Box sx={{ width: 'auto', typography: 'body1' }} style={textStyle} borderRadius="0.55rem" backgroundColor="white">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root.Mui-selected': {
                        color:theme.palette.secondary[500],
                        }, }}>
                    <TabList onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                        backgroundColor:theme.palette.secondary[500],
                        }
                    }}>
                        <Tab label="Tipe Kamar" value="1" onClick={() => handleTabKamar()}/>
                        <Tab label="Fasilitas Umum" value="2" onClick={() => handleTabUmum()} />
                        <Tab label="Fasilitas Kamar" value="3" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div align="right">
                            <Button type='submit' style={btnstyle2}
                                onClick={handleOpen}>+ Tambah</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                    <h3 id="parent-modal-title" textStyle="bold">Tambah Gedung</h3>
                                    <form>
                                        <TextField 
                                        label='Nama Gedung' 
                                        variant='standard'
                                        color='warning'
                                        fullWidth 
                                        required
                                        onChange={(e) => setValue(e.target.value)}
                                        
                                        InputLabelProps={{
                                            style: { color: "black" }
                                        }} 
                                        InputProps={{
                                            style: {
                                                color: "black"
                                            },
                                        }}
                                        />
                                        <TextField
                                        label='Masukan Gambar/Foto' 
                                        variant='standard'
                                        color='warning'
                                        fullWidth
                                        disabled />  
                                        <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                            <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                                Pilih Gambar
                                                <input
                                                type="file"
                                                accept=".jpg,.png"
                                                onChange={handleImageChange}
                                                hidden
                                                />
                                            </Button>
                                            <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                                Silakan unggah gambar (*.jpg, *png) 
                                            </Typography>
                                        </Box>
                                        <div align="center">
                                            <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                            <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Kembali</Button>
                                        </div>
                                    </form>
                                </Box>
                            </Modal>
                        </div>
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
                                src={`/src/asset/kamar/${kamar.gambar_kamar}`}
                                height="200"
                                width="auto"
                                borderRadius="0.55rem"
                            ></Box>
                                <Typography variant="h5" align='center' sx={{ color: theme.palette.secondary[100] }} margin="1em 0 0" fontWeight='bold'>
                                {kamar.nama_kamar}
                                </Typography>
                                <div align="center">
                                    <Button style={btnstyle} onClick={handleOpen1}>Lihat Detail</Button>
                                    <Modal
                                        open={open1}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Edit Gedung</h3>
                                            <form>
                                                <TextField 
                                                label='Nama Gedung' 
                                                variant='standard'
                                                color='warning'
                                                fullWidth 
                                                value="Gedung Kos Putih"
                                                required
                                                onChange={(e) => setValue(e.target.value)}
                                                
                                                InputLabelProps={{
                                                    style: { color: "black" }
                                                }} 
                                                InputProps={{
                                                    style: {
                                                        color: "black"
                                                    },
                                                }}
                                                />
                                                <TextField
                                                label='Masukan Gambar/Foto' 
                                                variant='standard'
                                                color='warning'
                                                fullWidth
                                                disabled />  
                                                <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                                    <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                                        Pilih Gambar
                                                        <input
                                                        type="file"
                                                        accept=".jpg,.png"
                                                        onChange={handleImageChange}
                                                        hidden
                                                        />
                                                    </Button>
                                                    <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                                        Silakan unggah gambar (*.jpg, *png) 
                                                    </Typography>
                                                </Box>
                                                <div align="center">
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Kembali</Button>
                                                </div>
                                            </form>
                                        </Box>
                                    </Modal>
                                    <IconButton style={btnstyle1} onClick={handleOpen2}><DeleteIcon /></IconButton>
                                    <Modal
                                        open={open2}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Hapus Gedung yang Dipilih ?</h3>
                                                <div align="center">
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, hapus</Button>
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Kembali</Button>
                                                </div>
                                        </Box>
                                    </Modal>
                                    
                                </div>
                        </Box>
                    </Box>
                    ))}
                    </TabPanel>
                    <TabPanel value="2">
                    {fasilitasUmumList.length > 0 && fasilitasUmumList.map(fasilitasUmum => (
                    <Box
                        key={fasilitasUmum.id_fasilitas_umum}
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
                                alt={`${fasilitasUmum.gambar_fasilitas}`}
                                src={`/src/asset/fasilitas/${fasilitasUmum.gambar_fasilitas}`}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                {fasilitasUmum.fasilitas.nama_fasilitas}
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
                                    }}>Lihat Detail</Button>
                                    <IconButton style={btnstyle1} onClick={handleOpen2}><DeleteIcon /></IconButton>
                            </div>
                        </Box>
                    </Box>
                    ))}
                    </TabPanel>
                    <TabPanel value="3">
                    <Box
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
                                alt="kasur"
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kasur
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                19 September 2010
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
                                    }}>Lihat Detail</Button>
                            </div>
                        </Box>
                    </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
  );
};
export default Inventory;