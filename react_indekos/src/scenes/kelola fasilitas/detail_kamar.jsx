import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Edit from './update_kamar.jsx';


const DetailFasilitasKamar = ({
    style,
    handleTabKamar,
    fasilitas,
}) => {
    const btnstyle={margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}

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

    return (
        <>
            <Button style={btnstyle} onClick={handleOpen}>Lihat Detail</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 350, padding: 2, maxHeight:500, overflow:'auto'  }} align="center">
                        <h3 id="parent-modal-title" textStyle="bold">Detail Fasilitas Kamar</h3>
                        <form>
                            <img
                                alt="No-Img"
                                src={`${fasilitas.gambar_fasilitas}`}
                                style={{ borderRadius: '1rem' }}
                                height="150"
                                width="auto"
                            />
                            <TextField 
                            label='Nama Fasilitas Kamar' 
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='nama_fasilitas'
                            value={formData.nama_fasilitas}
                            InputLabelProps={{
                                style: { color: "black" }
                            }} 
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                            label='Biaya Perawatan' 
                            style={{marginTop:'10px'}}
                            variant='standard'
                            color='warning'
                            fullWidth 
                            onChange={handleChange}
                            name='biaya_pembelian'
                            value={formData.biaya_perawatan}
                            InputLabelProps={{
                                style: { color: "black" }
                            }} 
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <div align="center">
                                <Edit
                                        style={style}
                                        fasilitas={fasilitas}
                                        handleTabKamar={handleTabKamar}
                                    />
                                <Button type='submit' style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
                            </div>
                        </form>
                    </Box>
            </Modal>
        </>
    );
}

export default DetailFasilitasKamar;