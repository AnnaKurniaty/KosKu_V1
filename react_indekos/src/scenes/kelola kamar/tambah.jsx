/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../axios-client";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.2), // Adjust the spacing between items
  '& .MuiCheckbox-root': {
    padding: theme.spacing(0.2), // Adjust the padding of the checkbox
  },
  '& .MuiTypography-root': {
    fontSize: '12px', // Adjust the font size of the label text
  },
}));

const FormGroupContainer = styled(FormGroup)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two columns
  gap: '2px', // Adjust the gap between the columns
});


const TambahFasilitas = ({
    gedungId,
    style,
    type,
    fasilitasKamarList,
}) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAdd1, setOpenAdd1] = React.useState(false);
  const [openAdd2, setOpenAdd2] = React.useState(false);
  const [dateValue, setDateValue] = useState('');
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

  const handleClose = () => {
    setOpenAdd(false),
    setOpenAdd1(false),
    setOpenAdd2(false);
 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const [formData, setFormData] = useState({
    'nama_kamar': '',
    'biaya_kamar': '',
    'gambar_kamar': null,
    'nama_fasilitas': '',
    'jumlah_fasilitas': '',
    'tanggal_pembelian': '',
    'biaya_pembelian': '',
    'gambar_fasilitas': null,
 })

 const [idFasilitasList, setIdFasilitasList] = useState([]);
 const handleSelectChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Jika checkbox dipilih, tambahkan nilai ke array
      setIdFasilitasList((prev) => [...prev, value]);
    } else {
      // Jika checkbox tidak dipilih, hapus nilai dari array
      setIdFasilitasList((prev) => prev.filter((id) => id !== value));
    }
    };

    const handleSubmitKamar = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('id_gedung', gedungId);
        data.append('nama_kamar', formData.nama_kamar);
        data.append('biaya_kamar', formData.biaya_kamar);
        // Iterasi melalui array dan tambahkan setiap elemen ke FormData
        idFasilitasList.forEach(id => {
            data.append('id_fasilitas_list[]', id);
        });
        if (formData.gambar_kamar) {
        data.append('gambar_kamar', formData.gambar_kamar);
        }

        try {
        const response = await axiosClient.post(`/kamar/insert`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Response:', response.data);
        // Implement logic for handling successful submission, e.g., showing a success message or redirecting to another page
        handleClose();
        } catch (error) {
        console.error('Error:', error.response.data.errors);
        // Implement logic for handling errors, e.g., showing an error message to the user
        setErrorMessage(error.response.data.message);
        handleOpen();
        }
    };

    const handleSubmitFasilitasKamar = async (e) => {
        e.preventDefault();
        // const data = new FormData();
        console.log('formData ', formData)
        const data = new FormData();
        data.append('nama_fasilitas', formData.nama_fasilitas);
        data.append('jumlah_fasilitas', formData.jumlah_fasilitas);
        data.append('tanggal_pembelian', formData.tanggal_pembelian);
        data.append('biaya_pembelian', formData.biaya_pembelian);
        if (formData.gambar_fasilitas) {
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

    const handleSubmitFasilitasUmum = async (e) => {
        e.preventDefault();
        // const data = new FormData();
        console.log('formData ', formData)
        const data = new FormData();
        data.append('nama_fasilitas', formData.nama_fasilitas);
        data.append('jumlah_fasilitas', formData.jumlah_fasilitas);
        data.append('tanggal_pembelian', formData.tanggal_pembelian);
        data.append('biaya_pembelian', formData.biaya_pembelian);
        if (formData.gambar_fasilitas) {
        data.append('gambar_fasilitas', formData.gambar_fasilitas);
        }

        try {
        const response = await axiosClient.post(`/fasilitas-umum/insert`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Response:', response.data);
        // Implement logic for handling successful submission, e.g., showing a success message or redirecting to another page
        handleClose();
        handleTabUmum();
        } catch (error) {
        console.error('Error:', error.response.data.errors);
        // Implement logic for handling errors, e.g., showing an error message to the user
        setErrorMessage(error.response.data.message);
        handleOpen();
        }
    };


  //STYLE
  const btnstyle = { margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' };

  return (
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
                            onChange={handleChange}
                            name="nama_kamar"
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
                            onChange={handleChange}
                            name="biaya_kamar"
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
                            <FormGroupContainer>
                                {fasilitasKamarList.map((fs, index) => (
                                    <StyledFormControlLabel
                                    key={index}
                                    control={<Checkbox color="success" />}
                                    value={fs.id_fasilitas}
                                    label={fs.nama_fasilitas}
                                    onClick={handleSelectChange}
                                    />
                                ))}
                            </FormGroupContainer>
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
                                <Button type='submit' onClick={handleSubmitKamar} style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Ya, simpan</Button>
                                <Button type='submit' onClick={handleClose} style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}}>Kembali</Button>
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
                            label='Nama Fasilitas Umum' 
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
                            onChange={handleChange}
                            name='tanggal_pembelian'
                            InputLabelProps={{
                                // shrink: == '', // Shrink label if value is not empty
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
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleSubmitFasilitasUmum}>Ya, simpan</Button>
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
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
                            onChange={handleChange}
                            name='tanggal_pembelian'
                            InputLabelProps={{
                                // shrink: == '', // Shrink label if value is not empty
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
  );
};

export default TambahFasilitas;