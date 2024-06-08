/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import axiosClient from "../../axios-client";


const detail = ({
    style,
    fetchData,
    kamar,
}) => {
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };

    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = () => {setOpen(true)};

    //For Inpput
    const [formData, setFormData] = useState({
        'nama_kamar': kamar.nama_kamar,
        'biaya_kamar': kamar.biaya_kamar,
        'status_kamar': kamar.status_kamar,
        'gambar_kamar': null,
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
        data.append('nama_kamar', formData.nama_kamar);
        data.append('biaya_kamar', formData.biaya_kamar);
        data.append('status_kamar', formData.status_kamar);
        if (formData.gambar_kamar) {
            data.append('gambar_kamar', formData.gambar_kamar);
        }

        try {
            const response = await axiosClient.post(`/edit-kamar/${kamar.id_kamar}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Response:', response.data);
            // Implement logic for handling successful submission, e.g., showing a success message or redirecting to another page
            handleClose();
            fetchData();
        } catch (error) {
            setErrorMessage(error.response.data.message);
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
                <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                    <h3 id="parent-modal-title" textstyle="bold">Detail Kamar</h3>
                    <form onSubmit={handleSubmit}>
                        <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
                            {errorMessage}
                        </Typography>
                        <img
                                alt="No-Img"
                                src={`${kamar.gambar_kamar}`}
                                style={{ borderRadius: '1rem' }}
                                height="150"
                                width="auto"
                            />
                        <TextField
                            label='Nama Kamar'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.nama_kamar}
                            onChange={handleChange}
                            name='nama_kamar'
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label='Biaya Kamar'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.nama_biaya}
                            onChange={handleChange}
                            name='nama_biaya'
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label='Status Kamar'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.status_biaya}
                            onChange={handleChange}
                            name='status_biaya'
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <div align="center">
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Ya, simpan</Button>
                            <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Kembali</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default detail;