/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../axios-client";

const TambahGedung = ({
    userId,
    style,
    fetchData,
}) => {

  const [errorMessage, setErrorMessage] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};

  //For Inpput
  const [formData, setFormData] = useState({
    'nama_gedung': '',
    'jumlah_kamar': '',
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
      const response = await axiosClient.post(`/tambah-gedung/${userId}`, data, {
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
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Tambah Gedung</h3>
          <form onSubmit={handleSubmit}>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
                {errorMessage}
            </Typography>
            <input type='hidden' name='userId' value={userId} />
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
              name='jumlah_kamar'
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
                  accept=".jpg,.png"
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
              <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Ya, simpan</Button>
              <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Kembali</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TambahGedung;