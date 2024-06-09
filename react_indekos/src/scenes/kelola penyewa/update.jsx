/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Update = ({
  penyewa,
  style,
  fetchData,
}) => {
  const btnstyle = { marginLeft:'2px', backgroundColor: '#FF9900', color: "white", padding: '0.2em 0', borderRadius: '0.5em', width: '8em' };
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };

  //For Input
  const [formData, setFormData] = useState({
    'nama_lengkap': penyewa.nama_lengkap,
    'alamat_penyewa': penyewa.alamat_penyewa,
    'nomor_telepon': penyewa.nomor_telepon,
    'no_pj_penyewa': penyewa.no_pj_penyewa,
    'tanggal_mulai_sewa': penyewa.tanggal_mulai_sewa,
    'tanggal_selesai_sewa': penyewa.tanggal_selesai_sewa,
    'status_penyewa': penyewa.status_penyewa,
    'foto_ktp': null,
  });

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
    data.append('nama_lengkap', formData.nama_lengkap);
    data.append('alamat_penyewa', formData.alamat_penyewa);
    data.append('nomor_telepon', formData.nomor_telepon);
    data.append('no_pj_penyewa', formData.no_pj_penyewa);
    data.append('tanggal_mulai_sewa', formData.tanggal_mulai_sewa);
    data.append('tanggal_selesai_sewa', formData.tanggal_selesai_sewa);
    data.append('status_penyewa', formData.status_penyewa);

    if (formData.foto_ktp) {
        data.append('foto_ktp', formData.foto_ktp);
    }

    try {
        const response = await axiosClient.post(`/edit-penyewa/${penyewa.id_penyewa}`, data, {
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
      <Button style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Detail Penyewa</h3>
          <form>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
              {errorMessage}
            </Typography>
            <TextField
              label='Nama Lengkap'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nama_lengkap}
              onChange={handleChange}
              name='nama_lengkap'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Alamat Penyewa'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.alamat_penyewa}
              onChange={handleChange}
              name='alamat_penyewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Nomor telepon'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nomor_telepon}
              onChange={handleChange}
              name='nomor_telepon'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='No Hp Penanggung Jawab Penyewa'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.no_pj_penyewa}
              onChange={handleChange}
              name='no_pj_penyewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Tanggal Mulai Sewa'
              variant='standard'
              color='warning'
              type='date'
              fullWidth
              value={formData.tanggal_mulai_sewa}
              onChange={handleChange}
              name='tanggal_mulai_sewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='tanggal Selesai Sewa'
              variant='standard'
              color='warning'
              type='date'
              fullWidth
              value={formData.tanggal_selesai_sewa}
              onChange={handleChange}
              name='tanggal_selesai_sewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Status Kamar'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.status_penyewa}
              name='status_penyewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <Typography align='left' marginTop='10px'>
              Masukan Gambar / Foto
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', border: '2px solid #FF9900', borderRadius: '1em', padding: 2 }}>
              <Button variant="contained" component="label" size="small" style={{ borderRadius: "2em" }}>
                Pilih Gambar
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  name='foto_ktp'
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              <Typography variant='caption' style={{ marginLeft: 'auto', textAlign: 'left' }}>
                Silakan unggah gambar (*.jpg, *png)
              </Typography>
            </Box>
            <div align="center">
            <Button type='submit' style={{margin:'0.5em', backgroundColor:'#E21111', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleSubmit}>Ya, Simpan</Button>
              <Button type='submit' style={{margin:'0.5em', backgroundColor:'#69AC77', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Update;
