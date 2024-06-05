import React, { useState, useEffect  } from 'react'
import { Box, useTheme, useMediaQuery, Typography, Button, TextField, CircularProgress} from '@mui/material'
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import axiosClient from "../../axios-client.js";
import { useLocation } from 'react-router-dom';


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

const Room = () => {
    const theme = useTheme();
    const location = useLocation();
    const [gedungList, setGedungList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            if (location.state && location.state.userId) {
              setUserId(location.state.userId);
              const response = await axiosClient.get(`/gedung/${location.state.userId}`);
              const data = response.data;
              setGedungList(data.gedung); // Atur data gedung dari respons ke state gedungList
            }
          } catch (error) {
            console.error("Failed to fetch data", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [location.state]);
    

    const editBuilding = (buildingId) => {
        navigate(`/edit-building/${buildingId}`);
    };

    const deleteBuilding = (buildingId) => {
        // Implement logic to delete building by ID
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
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
    const btnstyle={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}
    const btnstyle1={margin:'0.2em', backgroundColor:'#FF9900', color:"white", borderRadius: '0.5em'}

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
                <Box>
                    <Typography
                    variant='h5'
                    color='white'
                    fontWeight='bold'
                    sx={{ mb: '5px' }}
                    >
                        Daftar Gedung Kos
                    </Typography>
                </Box>
                <Button type='submit' style={btnstyle} 
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
                {gedungList.map(gedung => (
                <Box
                    key={gedung.id}
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                    sx={{
                        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                    }}
                >
                    {/* Display building details */}
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
                    >
                        {/* Display building image */}
                        <img
                            alt="kost2"
                            src={gedung.gambar_gedung}
                            height="auto"
                            width="auto"
                            borderRadius="0.55rem"
                            onClick={() => {
                                navigate('/kelola fasilitas/${gedung.id}');
                            }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 'auto' }}>
                                {/* Display building name and room count */}
                                <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} margin="1em 0 0" fontWeight='bold'>
                                    {gedung.nama}
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} margin="0 0 0 0">
                                    Jumlah Kamar : {gedung.jumlah_kamar}
                                </Typography>
                            </div>
                                <IconButton style={btnstyle1} onClick={handleOpen1}><EditIcon /></IconButton>
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
            </Box>
    )
}

export default Room
