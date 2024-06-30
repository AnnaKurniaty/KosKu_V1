import { Box, Button, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Edit from './update.jsx';
import Hapus from './hapus.jsx';


const Detail = ({
  penyewa,
  style,
  fetchData,
  userId,
}) => {
  const btnstyle = { marginLeft:'2px', backgroundColor: '#FF9900', color: "white", padding: '0.2em 0', borderRadius: '0.5em', width: '8em', height:'3em' };
  const [errorMessage, setErrorMessage] = useState('');
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
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
    'nama_kamar': penyewa.nama_kamar,
    'foto_ktp': null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      <Button sx={{ ...btnstyle, fontSize:isLargeScreen ? '1.1em' : '0.7em'}} onClick={handleOpen}>Lihat Detail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 320, maxHeight:500, padding: 2, overflow:'auto' }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Detail Penyewa</h3>
          <form>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
              {errorMessage}
            </Typography>
            <img
              alt="No-Img"
              src={`${penyewa.foto_ktp}`}
              style={{ borderRadius: '1rem' }}
              height="150"
              width="auto"
            />
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
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
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label='Status Penyewa'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.status_penyewa}
              name='status_penyewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label='Nama Kamar'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nama_kamar}
              name='nama_kamar'
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
                penyewa={penyewa}
                fetchData={fetchData}
                userId={userId}
              />
              <Hapus
                style={style}
                id_menyewa={penyewa.id_menyewa}
                fetchData={fetchData}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Detail;
