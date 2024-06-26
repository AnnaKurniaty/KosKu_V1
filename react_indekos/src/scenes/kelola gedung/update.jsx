import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import axiosClient from "../../axios-client";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const UpdateGedung = ({
    style,
    fetchData,
    gedung,
}) => {
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = () => {setOpen(true)};
    const [successMessage, setSuccessMessage] = useState('');

    //For Inpput
    const [formData, setFormData] = useState({
        'nama_gedung': gedung.nama_gedung,
        'jumlah_kamar': gedung.jumlah_kamar,
        'gambar_gedung': null,
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

        console.log("Data FormData First : ", formData);

        const data = new FormData();
        data.append('nama_gedung', formData.nama_gedung);
        data.append('jumlah_kamar', formData.jumlah_kamar);
        if (formData.gambar_gedung) {
            data.append('gambar_gedung', formData.gambar_gedung);
        }

        try {
            const response = await axiosClient.post(`/edit-gedung/${gedung.id_gedung}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Response:', response.data);
            setSuccessMessage('Gedung berhasil diubah');
            handleClose();
            fetchData();
        } catch (error) {
            setErrorMessage('Gedung gagal diubah');
            handleOpen();
        }
    };

    return (
        <>
            <IconButton style={btnstyle1} onClick={handleOpen}><EditIcon /></IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 320, padding: 2, border:'1px solid #69AC77' }} align="center">
                    <h3 id="parent-modal-title" textstyle="bold">Edit Gedung</h3>
                    <form onSubmit={handleSubmit}>
                        <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
                            {errorMessage}
                        </Typography>
                        <TextField
                            label='Nama Gedung'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.nama_gedung}
                            onChange={handleChange}
                            name='nama_gedung'
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
                            label='Jumlah Kamar'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.jumlah_kamar}
                            onChange={handleChange}
                            name='jumlah_kamar'
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
                        <Box sx={{ mt: 2, display: 'flex', border: '1px solid #FF9900', borderRadius: '1em', padding: 2 }}>
                            <Button variant="contained" component="label" size="small" style={{ borderRadius: "2em" }}>
                                Pilih Gambar
                                <input
                                    type="file"
                                    accept=".jpg,.png,.jpeg"
                                    name='gambar_gedung'
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </Button>
                            <Typography variant='caption' style={{ marginLeft: 'auto', textAlign: 'left' }}>
                                Silakan unggah gambar (*.jpg, *png)
                            </Typography>
                        </Box>
                        <div align="center">
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Ya, simpan</Button>
                            <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Kembali</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <SuccessModal
                message={successMessage}
            />
            <ErrorModal
                message={errorMessage}
            />
        </>
    );
}

export default UpdateGedung;