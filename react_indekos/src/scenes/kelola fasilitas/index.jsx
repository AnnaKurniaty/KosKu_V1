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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DetailFasilitasKamar from './detail_kamar.jsx';

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
    const [image, setImage] = useState(null);
    const [dateValue, setDateValue] = useState('');

    useEffect(() => {
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
                setGedungList(data.kamar || []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    const [formData, setFormData] = useState({
        'nama_fasilitas': '',
        'jumlah_fasilitas': '',
        'tanggal_pembelian': '',
        'biaya_pembelian': '',
        'gambar_fasilitas': null,
    })

    const handleSubmitFasilitasKamar = async (e) => {
        e.preventDefault();
        // const data = new FormData();
        console.log('formData ', formData)
        const data = new FormData();
        data.append('nama_fasilitas', formData.nama_fasilitas);
        data.append('jumlah_fasilitas', formData.jumlah_fasilitas);
        data.append('tanggal_pembelian', formData.tanggal_pembelian);
        data.append('biaya_pembelian', formData.biaya_pembelian);
        if (formData.gambar_gedung) {
        data.append('gambar_fasilitas', formData.gambar_fasilitas);
        }

        try {
        const response = await axiosClient.post(`/fasilitas-kamar/insert`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Response:', response.data);
        // Implement logic for handling successful submission, e.g., showing a success message or redirecting to another page
        handleClose();
        handleTabKamar();
        } catch (error) {
        console.error('Error:', error.response.data.errors);
        // Implement logic for handling errors, e.g., showing an error message to the user
        setErrorMessage(error.response.data.message);
        handleOpen();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openAdd1, setOpenAdd1] = React.useState(false);
    const [openAdd2, setOpenAdd2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const handleOpen = () => {
        if(type === 'kamar'){
            setOpenAdd(true);
        }
        else if(type === 'fasilitas_umum'){
            setOpenAdd1(true);
        }
        else{
            setOpenAdd2(true);
        }
    };
    const handleOpen3 = () => {
        setOpen3(true);
    };
    const handleOpen4 = () => {
        setOpen4(true);
    };
    const handleOpen5 = () => {
        setOpen5(true);
    };
    const handleOpen6 = () => {
        setOpen6(true);
    };
    const handleClose = () => {
        setOpenAdd(false),
        setOpenAdd1(false),
        setOpenAdd2(false);
    };
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const textStyle={backgroundColor:theme.palette.background.alt}
    const btnstyle1={margin:'0.2em', backgroundColor:'#FF9900', color:"white", borderRadius: '0.5em'}
    const btnstyle2={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}
    const btnstyle={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
    return (
        <Box m='1.5rem 2.5rem'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography
                        variant='h5'
                        color='white'
                        fontWeight='bold'
                        sx={{ mb: '5px' }}
                    >
                        Daftar Fasilitas Kos
                    </Typography>
                </Box>
                <Button type='submit' style={btnstyle2}
                    onClick={handleOpen}>+ Tambah</Button>
                <Modal
                    open={openAdd}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                        <h3 id="parent-modal-title" textStyle="bold">Tambah Kamar</h3>
                        <form>
                            <TextField 
                            label='Nama Kamar' 
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
                            label='Biaya Kamar' 
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
                            <div style={{ display: 'flex', alignItems: 'left', marginTop:'10px'}}>
                                <Typography>
                                    Fasilitas* 
                                </Typography>
                                <Typography variant="caption">
                                     (Pilih dengan menekan fasilitas)
                                </Typography>
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox color="success"/>} label="Meja" />
                                <FormControlLabel control={<Checkbox color="success"/>} label="Kursi" />
                                <FormControlLabel control={<Checkbox color="success"/>} label="Disabled" />
                            </FormGroup>
                            <Typography align='left' marginTop='10px'>
                                    Masukan Gambar / Foto 
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                    Pilih Gambar
                                    <input
                                    type="file"
                                    accept=".jpg,.png"
                                    onChange={handleFileChange}
                                    hidden
                                    />
                                </Button>
                                <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                    Silakan unggah gambar (*.jpg, *png) 
                                </Typography>
                            </Box>
                            <div align="center">
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} formNoValidate>Kembali</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
                <Modal
                    open={openAdd1}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                        <h3 id="parent-modal-title" textStyle="bold">Tambah Fasilitas Umum</h3>
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
                                    onChange={handleFileChange}
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
                <Modal
                    open={openAdd2}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                   <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                        <h3 id="parent-modal-title" textStyle="bold">Tambah Fasilitas Kamar</h3>
                        <form>
                            <TextField 
                            label='Nama Fasilitas Kamar' 
                            variant='standard'
                            color='warning'
                            fullWidth 
                            required
                            onChange={handleChange}
                            name='nama_fasilitas'
                            
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
                            label='Jumlah Fasilitas' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            required
                            onChange={handleChange}
                            name='jumlah_fasilitas'
                            
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
                            label='Tanggal Pembelian / Pembuatan' 
                            style={{marginTop:'10px'}}
                            type='date'
                            variant='standard'
                            color='warning'
                            fullWidth 
                            required
                            value={dateValue}
                            onChange={handleChange}
                            name='tanggal_pembelian'
                            InputLabelProps={{
                                shrink: dateValue == '', // Shrink label if value is not empty
                                style: { color: "black" }
                            }}
                            InputProps={{
                                style: {
                                    color: "black"
                                },
                            }}
                            />
                            <TextField 
                            label='Biaya Pembelian' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            required
                            onChange={handleChange}
                            name='biaya_pembelian'
                            
                            InputLabelProps={{
                                style: { color: "black" }
                            }} 
                            InputProps={{
                                style: {
                                    color: "black"
                                },
                            }}
                            />
                            <Typography align='left' marginTop='10px'>Masukan Gambar/Foto</Typography> 
                            <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                    Pilih Gambar
                                    <input
                                    type="file"
                                    accept=".jpg,.png"
                                    name='gambar_fasilitas'
                                    onChange={handleFileChange}
                                    hidden
                                    />
                                </Button>
                                <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                    Silakan unggah gambar (*.jpg, *png) 
                                </Typography>
                            </Box>
                            <div align="center">
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleSubmitFasilitasKamar}>Ya, simpan</Button>
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
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
                                    <Button style={btnstyle} onClick={handleOpen3}>Lihat Detail</Button>
                                    <Modal
                                        open={open3}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Edit Kamar</h3>
                                            <form>
                                                <TextField 
                                                label='Nama Kamar' 
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
                                                label='Biaya Kamar' 
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
                                                <div style={{ display: 'flex', alignItems: 'left', marginTop:'10px'}}>
                                                    <Typography>
                                                        Fasilitas* 
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        (Pilih dengan menekan fasilitas)
                                                    </Typography>
                                                </div>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox color="success"/>} label="Meja" />
                                                    <FormControlLabel control={<Checkbox color="success"/>} label="Kursi" />
                                                    <FormControlLabel control={<Checkbox color="success"/>} label="Disabled" />
                                                </FormGroup>
                                                <Typography align='left' marginTop='10px'>
                                                        Masukan Gambar / Foto 
                                                </Typography>
                                                <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                                    <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                                        Pilih Gambar
                                                        <input
                                                        type="file"
                                                        accept=".jpg,.png"
                                                        onChange={handleFileChange}
                                                        hidden
                                                        />
                                                    </Button>
                                                    <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                                        Silakan unggah gambar (*.jpg, *png) 
                                                    </Typography>
                                                </Box>
                                                <div align="center">
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} formNoValidate>Kembali</Button>
                                                </div>
                                            </form>
                                        </Box>
                                    </Modal>
                                    <IconButton style={btnstyle1} onClick={handleOpen4}><DeleteIcon /></IconButton>
                                    <Modal
                                        open={open4}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Hapus Kamar yang Dipilih ?</h3>
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
                                <Button type='submit' style={btnstyle} onClick={handleOpen3}>Lihat Detail</Button>
                                <IconButton style={btnstyle1} onClick={handleOpen4}><DeleteIcon /></IconButton>
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
                                    <Button style={btnstyle} onClick={handleOpen5}>Lihat Detail</Button>
                                    <Modal
                                        open={open5}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Lihat Detail</h3>
                                            <form>
                                                <TextField 
                                                label='Nama Fasilitas Kamar' 
                                                variant='standard'
                                                color='warning'
                                                value={formData.nama_fasilitas}
                                                fullWidth 
                                                required
                                                onChange={handleChange}
                                                
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
                                                label='Jumlah Fasilitas' 
                                                style={{marginTop:'10px'}}
                                                variant='standard'
                                                color='warning'
                                                value={formData.jumlah_fasilitas}
                                                fullWidth 
                                                required
                                                onChange={handleChange}
                                                
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
                                                label='Tanggal Pembelian / Pembuatan' 
                                                style={{marginTop:'10px'}}
                                                type='date'
                                                variant='standard'
                                                color='warning'
                                                value={formData.tanggal_pembelian}
                                                fullWidth 
                                                required
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: value == '', // Shrink label if value is not empty
                                                    style: { color: "black" }
                                                }}
                                                InputProps={{
                                                    style: {
                                                        color: "black"
                                                    },
                                                }}
                                                />
                                                <TextField 
                                                label='Biaya Pembelian' 
                                                style={{marginTop:'10px'}}
                                                variant='standard'
                                                color='warning'
                                                value={formData.biaya_pembelian}
                                                fullWidth 
                                                required
                                                onChange={handleChange}
                                                
                                                InputLabelProps={{
                                                    style: { color: "black" }
                                                }} 
                                                InputProps={{
                                                    style: {
                                                        color: "black"
                                                    },
                                                }}
                                                />
                                                <Typography align='left' marginTop='10px'>Masukan Gambar/Foto</Typography> 
                                                <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding:2 }}>
                                                    <Button variant="contained" component="label" size="small" style={{borderRadius:"2em"}}>
                                                        Pilih Gambar
                                                        <input
                                                        type="file"
                                                        accept=".jpg,.png"
                                                        onChange={handleFileChange}
                                                        hidden
                                                        />
                                                    </Button>
                                                    <Typography variant='caption' style={{marginLeft:'auto', textAlign:'left'}}>
                                                        Silakan unggah gambar (*.jpg, *png) 
                                                    </Typography>
                                                </Box>
                                                <div align="center">
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
                                                </div>
                                            </form>
                                        </Box>
                                    </Modal>
                                    <IconButton style={btnstyle1} onClick={handleOpen6}><DeleteIcon /></IconButton>
                                    <Modal
                                        open={open6}
                                        onClose={handleClose}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                                            <h3 id="parent-modal-title" textStyle="bold">Hapus Fasilitas Kamar yang Dipilih ?</h3>
                                                <div align="center">
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, hapus</Button>
                                                    <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
                                                </div>
                                        </Box>
                                    </Modal>
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