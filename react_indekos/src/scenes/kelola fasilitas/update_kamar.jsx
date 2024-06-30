/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography, Select, MenuItem, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const EditKamar = ({
    style,
    fasilitas_kamar,
    handleTabKamar,
    fetchData,
    gedungId
}) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => { setOpen(false) };
    const handleOpen = () => { setOpen(true) };
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isLargeScreen = useMediaQuery("(min-width: 1280px)");
    const [formData, setFormData] = useState({
        'nama_fasilitas': fasilitas_kamar.nama_fasilitas,
        'jumlah_fasilitas': fasilitas_kamar.jumlah_fasilitas,
        'tanggal_perbaikan': fasilitas_kamar.tanggal_perbaikan,
        'biaya_perbaikan': fasilitas_kamar.biaya_perbaikan,
        'gambar_fasilitas': null,
        'id_kamar': ''
    });

    const [kamarList, setKamarList] = useState([]);
    const [selectedKamar, setSelectedKamar] = useState('');

    useEffect(() => {
        // Memuat daftar kamar saat komponen dimuat
        const fetchKamar = async () => {
            try {
                const response = await axiosClient.get(`/kamar/${gedungId}`);
                setKamarList(response.data.kamar);
            } catch (error) {
                console.error("Failed to fetch kamar", error);
            }
        };

        fetchKamar();
    }, [gedungId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleKamarChange = (e) => {
        setSelectedKamar(e.target.value);
        setFormData({ ...formData, id_kamar: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('nama_fasilitas', formData.nama_fasilitas);
        data.append('jumlah_fasilitas', formData.jumlah_fasilitas);
        data.append('tanggal_perbaikan', formData.tanggal_perbaikan);
        data.append('biaya_perbaikan', formData.biaya_perbaikan);
        data.append("id_kamar", selectedKamar);
        if (formData.gambar_fasilitas) {
            data.append('gambar_fasilitas', formData.gambar_fasilitas);
        }

        try {
            const response = await axiosClient.post(`/fasilitas-kamar/update/${fasilitas_kamar.id_fasilitas_kamar}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Response:', response.data);
            setSuccessMessage('Fasilitas berhasil diubah');
            handleClose();
            handleTabKamar();
            fetchData();
        } catch (error) {
            console.error('Error:', error.response.data.errors);
            setErrorMessage('Fasilitas gagal diubah');
            handleOpen();
        }
    };

    return (
        <>
            <Button style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em', fontSize: isLargeScreen ? '1.1em' : '0.9em' }} onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 320, padding: 2, maxHeight: 500, overflow: 'auto', border: '1px solid #69AC77' }} align="center">
                    <h3 id="parent-modal-title" textStyle="bold">Edit Fasilitas Kamar</h3>
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
                            style={{ marginTop: '10px' }}
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
                            label='Tanggal Perawatan / Perbaikan'
                            views='Tanggal Perawatan / Perbaikan'
                            style={{ marginTop: '10px' }}
                            type='date'
                            variant='standard'
                            color='warning'
                            fullWidth
                            value={formData.tanggal_perbaikan}
                            onChange={handleChange}
                            name='tanggal_perbaikan'
                            InputLabelProps={{
                                shrink: true,
                                style: { color: "black" }
                            }}
                        />
                        <TextField
                            label='Biaya perbaikan'
                            style={{ marginTop: '10px' }}
                            variant='standard'
                            color='warning'
                            fullWidth
                            onChange={handleChange}
                            name='biaya_perbaikan'
                            value={formData.biaya_perbaikan}
                            InputLabelProps={{
                                style: { color: "black" }
                            }}
                        />
                        <Typography align='left' marginTop='10px'>
                            Pilih Kamar
                        </Typography>
                        <Select
                            value={selectedKamar}
                            onChange={handleKamarChange}
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            style={{ marginTop: '10px', marginBottom: '10px' }}
                        >
                            <MenuItem value="" disabled>
                                Pilih Kamar
                            </MenuItem>
                            {kamarList.map((kamar) => (
                                <MenuItem key={kamar.id_kamar} value={kamar.id_kamar}>
                                    {kamar.nama_kamar}
                                </MenuItem>
                            ))}
                        </Select>
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
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Ya, simpan</Button>
                            <Button type='button' style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} onClick={handleClose}>Kembali</Button>
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

export default EditKamar;
