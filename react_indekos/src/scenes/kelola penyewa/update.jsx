import { Box, Button, Modal, TextField, Typography, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const Update = ({
  penyewa,
  style,
  fetchData,
  userId,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // For Input
  const [formData, setFormData] = useState({
    'nama_lengkap': penyewa.nama_lengkap,
    'alamat_penyewa': penyewa.alamat_penyewa,
    'nomor_telepon': penyewa.nomor_telepon,
    'no_pj_penyewa': penyewa.no_pj_penyewa,
    'tanggal_mulai_sewa': penyewa.tanggal_mulai_sewa,
    'tanggal_selesai_sewa': penyewa.tanggal_selesai_sewa,
    'status_penyewa': penyewa.status_penyewa,
    'id_kamar': penyewa.nama_kamar,
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

  const handleKamarChange = (e) => {
    setSelectedKamar(e.target.value);
    setFormData({ ...formData, id_kamar: e.target.value });
  };

  const [kamarList, setKamarList] = useState([]);
  const [selectedKamar, setSelectedKamar] = useState(formData.id_kamar);

  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const response = await axiosClient.get(`/kamar-kosong/${userId}`);
        setKamarList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setErrorMessage("Failed to fetch room data.");
        handleOpen();
      }
    };

    fetchKamar();
  }, [userId]);

  let selectOptions = [{ id_kamar: formData.id_kamar, nama_kamar: formData.nama_kamar }, ...kamarList.map(kamar => ({
    id_kamar: kamar.id_kamar.toString(),
    nama_kamar: kamar.nama_kamar,
  }))];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id_kamar', selectedKamar);
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
      const response = await axiosClient.post(`/edit-penyewa/${penyewa.id_menyewa}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccessMessage('Penyewa berhasil diubah');
      handleClose();
      fetchData();
    } catch (error) {
      setErrorMessage('Penyewa gagal diubah');
      handleOpen();
    }
  };

  return (
    <>
      <Button style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 320, maxHeight: 500, padding: 2, overflow: 'auto' }} align="center">
          <h3 id="parent-modal-title" style={{ fontWeight: 'bold' }}>Update Penyewa</h3>
          <form onSubmit={handleSubmit}>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.75rem' }}>
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
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <TextField
              label='Tanggal Selesai Sewa'
              variant='standard'
              color='warning'
              type='date'
              fullWidth
              value={formData.tanggal_selesai_sewa}
              onChange={handleChange}
              name='tanggal_selesai_sewa'
              InputProps={{
                readOnly: true,
              }}
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
              {selectOptions.map((kamar) => (
                <MenuItem key={kamar.id_kamar} value={kamar.id_kamar}>
                  {kamar.nama_kamar}
                </MenuItem>
              ))}
            </Select>
            <Typography align='left' marginTop='10px'>
              Masukan Gambar / Foto
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', border: '1px solid #FF9900', borderRadius: '1em', padding: 2 }}>
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
                Silakan unggah gambar (*.jpg, *.png)
              </Typography>
            </Box>
            <div align="center">
              <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Ya, Simpan</Button>
              <Button style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} onClick={handleClose}>Kembali</Button>
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

export default Update;
