import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal, useMediaQuery } from "@mui/material";
import axiosClient from "../../axios-client";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const TambahGedung = ({ userId, style, fetchData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  const [formData, setFormData] = useState({
    nama_gedung: "",
    jumlah_kamar: "",
    gambar_gedung: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const validateFields = () => {
    return formData.nama_gedung.trim() !== "" && formData.jumlah_kamar.trim() !== "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setErrorMessage('Terjadi kesalahan saat menambahkan gedung');
      setOpenErrorModal(true);
      return;
    }

    const data = new FormData();
    data.append('nama_gedung', formData.nama_gedung);
    data.append('jumlah_kamar', formData.jumlah_kamar);
    if (formData.gambar_gedung) {
      data.append('gambar_gedung', formData.gambar_gedung);
    }

    try {
      const response = await axiosClient.post(`/tambah-gedung/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuccessMessage('Gedung berhasil ditambahkan');
      setOpenSuccessModal(true);
      handleClose();
      fetchData();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data;
        let errorMessage = '';
        Object.keys(errors).forEach((key) => {
          errorMessage += `${errors[key][0]} `;
        });
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('Terjadi kesalahan saat menambahkan gedung');
      }
      setOpenErrorModal(true);
    }
  };

  const buttonContainerStyle = {
    backgroundColor: '#FF9900',
    color: "white",
    borderRadius: '0.5em',
    fontSize: isLargeScreen ? '0.95rem' : '0.9rem',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography
          variant='h5'
          color='#FF9900'
          fontWeight='bold'
          sx={{ mb: '5px', fontSize:isLargeScreen ? '2em' : '1.4em' }}
        >
          Daftar Gedung Kos
        </Typography>
      </Box>
      <Button
        type='button'
        style={buttonContainerStyle}
        onClick={handleOpen}
      >
        + Tambah
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 320, padding: 2, border: '1px solid #69AC77' }} align="center">
          <h3 id="parent-modal-title" style={{ fontWeight: 'bold' }}>Tambah Gedung</h3>
          <form onSubmit={handleSubmit}>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.8rem' }}>
              {errorMessage}
            </Typography>
            <TextField
              label='Nama Gedung'
              variant='standard'
              color='warning'
              fullWidth
              onChange={handleChange}
              name='nama_gedung'
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: { color: "black" },
              }}
              error={!!errorMessage && !formData.nama_gedung.trim()}
              helperText={!!errorMessage && !formData.nama_gedung.trim() && 'Nama Gedung harus diisi'}
            />
            <TextField
              label='Jumlah Kamar'
              variant='standard'
              color='warning'
              fullWidth
              name='jumlah_kamar'
              onChange={handleChange}
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                style: { color: "black" },
              }}
              error={!!errorMessage && !formData.jumlah_kamar.trim()}
              helperText={!!errorMessage && !formData.jumlah_kamar.trim() && 'Jumlah Kamar harus diisi'}
            />
            <TextField
              label='Masukan Gambar/Foto'
              variant='standard'
              color='warning'
              fullWidth
              disabled
            />
            <Box sx={{ mt: 2, display: 'flex', border: '1px solid #FF9900', borderRadius: '1em', padding: 2 }}>
              <Button variant="contained" component="label" size="small" style={{ borderRadius: "2em" }}>
                Pilih Gambar
                <input
                  type="file"
                  accept=".jpg,.png"
                  name='gambar_gedung'
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              <Typography variant='caption' style={{ marginLeft: 'auto', textAlign: 'left' }}>
                Silakan unggah gambar (*.jpg, *.png)
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
        open={openSuccessModal}
        handleClose={() => setOpenSuccessModal(false)}
        message={successMessage}
      />
      <ErrorModal
        open={openErrorModal}
        handleClose={() => setOpenErrorModal(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default TambahGedung;
