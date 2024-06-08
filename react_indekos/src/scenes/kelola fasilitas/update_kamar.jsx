/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import axiosClient from "../../axios-client";


const EditKamar = ({
    style,
    handleTabKamar,
    fasilitas,
}) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = () => {setOpen(true)};

    const [formData, setFormData] = useState({
        'nama_fasilitas': fasilitas.nama_fasilitas,
        'jumlah_fasilitas': fasilitas.jumlah_fasilitas,
        'tanggal_pembelian': fasilitas.tanggal_pembelian,
        'biaya_pembelian': fasilitas.biaya_pembelian,
        'tanggal_perawatan': fasilitas.tanggal_perawatan,
        'biaya_perawatan': fasilitas.biaya_perawatan,
        'gambar_fasilitas': null,
     })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data = new FormData();
        console.log('formData ', formData)
        const data = new FormData();
        data.append('nama_fasilitas', formData.nama_fasilitas);
        data.append('jumlah_fasilitas', formData.jumlah_fasilitas);
        data.append('tanggal_pembelian', formData.tanggal_pembelian);
        data.append('biaya_pembelian', formData.biaya_pembelian);
        data.append('tanggal_perawatan', formData.tanggal_perawatan);
        data.append('biaya_perawatan', formData.biaya_perawatan);
        if (formData.gambar_gedung) {
        data.append('gambar_fasilitas', formData.gambar_fasilitas);
        }

        try {
        const response = await axiosClient.post(`/fasilitas-kamar/update/${fasilitas.id_fasilitas}`, data, {
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

    return (
        <>
            <Button style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                        <h3 id="parent-modal-title" textStyle="bold">Detail Fasilitas Kamar</h3>
                        <form onSubmit={handleSubmit}>
                            <TextField 
                            label='Nama Fasilitas' 
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='nama_fasilitas'
                            value={formData.nama_fasilitas}
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            />
                            <TextField 
                            label='Jumlah Fasilitas' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='jumlah_fasilitas'
                            value={formData.jumlah_fasilitas}
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            />
                            <TextField 
                            label='Tanggal Pembelian / Pembuatan' 
                            style={{marginTop:'10px'}}
                            type='date'
                            variant='standard'
                            color='warning'
                            fullWidth 
                            value={formData.tanggal_pembelian}
                            onChange={handleChange}
                            name='tanggal_pembelian'
                            InputLabelProps={{
                                // shrink: dateValue == '', // Shrink label if value is not empty
                                style: { color: "black" }
                            }}
                            />
                            <TextField 
                            label='Biaya Pembelian' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='biaya_pembelian'
                            value={formData.biaya_pembelian}
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            />
                            <TextField 
                            label='Tanggal Perawatan / Perbaikan' 
                            style={{marginTop:'10px'}}
                            type='date'
                            variant='standard'
                            color='warning'
                            fullWidth 
                            value={formData.tanggal_perawatan}
                            onChange={handleChange}
                            name='tanggal_perawatan'
                            InputLabelProps={{
                                // shrink: dateValue == '', // Shrink label if value is not empty
                                style: { color: "black" }
                            }}
                            />
                            <TextField 
                            label='Biaya Perawatan' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='biaya_perawatan'
                            value={formData.biaya_perawatan}
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            />
                            <TextField
                            label='Masukan Gambar/Foto'
                            variant='standard'
                            color='warning'
                            fullWidth
                            disabled />
                        <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding: 2 }}>
                            <Button variant="contained" component="label" size="small" style={{ borderRadius: "2em" }}>
                                Pilih Gambar
                                <input
                                    type="file"
                                    accept=".jpg,.png,.jpeg"
                                    name='gambar_fasilitas'
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </Button>
                            <Typography variant='caption' style={{ marginLeft: 'auto', textAlign: 'left' }}>
                                Silakan unggah gambar (*.jpg, *png)
                            </Typography>
                        </Box>
                            <div align="center">
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Ya, simpan</Button>
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
                            </div>
                        </form>
                    </Box>
            </Modal>
        </>
    );
}

export default EditKamar;