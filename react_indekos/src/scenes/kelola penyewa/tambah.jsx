import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useNavigate } from 'react-router-dom';
import { useTheme, Grid, Paper, TextField, Typography, Button, Select, MenuItem, Modal, Box } from '@mui/material';
import ErrorModal from "../../components/ErrorModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px solid #69AC77',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '1em'
};

const Tambah = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errorOpen, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId

  // For Input
  const [formData, setFormData] = useState({
    'nama_lengkap': '',
    'alamat_penyewa': '',
    'nomor_telepon': '',
    'no_pj_penyewa': '',
    'status_penyewa': 'aktif',
    'foto_ktp': null,
    'id_kamar': '',
    'tanggal_mulai_sewa': '',
  });

  const [kamarList, setKamarList] = useState([]);
  const [selectedKamar, setSelectedKamar] = useState('');
  const openError = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
  };

  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const response = await axiosClient.get('/kamar-kosong');
        setKamarList(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchKamar();
  }, []);

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
    data.append('nama_lengkap', formData.nama_lengkap);
    data.append('alamat_penyewa', formData.alamat_penyewa);
    data.append('nomor_telepon', formData.nomor_telepon);
    data.append('no_pj_penyewa', formData.no_pj_penyewa);
    data.append('status_penyewa', formData.status_penyewa);
    data.append('tanggal_mulai_sewa', formData.tanggal_mulai_sewa);
    data.append('id_kamar', selectedKamar);

    if (formData.foto_ktp) {
      data.append('foto_ktp', formData.foto_ktp);
    }

    try {
      const response = await axiosClient.post(`/tambah-penyewa`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response:', response.data);
      setUserId(response.data.userId); // Store userId in state
      setSuccessOpen(true);
    } catch (error) {
      setErrorMessage('Pastikan Semua Terisi Dengan Benar');
    }
  }

  const handleSuccessClose = () => {
    navigate(`/kelola penyewa/${userId}`); // Navigate to the correct URL
    setSuccessOpen(false); // Close the modal
  };

  const paperStyle = { padding: 20, height: "auto", width: 300, backgroundColor: theme.palette.background.alt, borderRadius: '3rem', borderColor: '#69AC77', borderStyle: 'solid', position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={10} style={paperStyle}>
          <h3 id="parent-modal-title" textstyle="bold" align="center">Tambah Penyewa</h3>
          <form>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
              {errorMessage}
            </Typography>
            <TextField
              label='Nama Lengkap'
              variant='standard'
              color='warning'
              fullWidth
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
              onChange={handleChange}
              name='no_pj_penyewa'
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
              label='Tanggal Mulai Sewa'
              variant='standard'
              color='warning'
              type='date'
              fullWidth
              onChange={handleChange}
              name='tanggal_mulai_sewa'
              InputLabelProps={{
                style: { color: "black" }
              }}
            />
            <Typography align='left' marginTop='10px'>
              Masukan Foto KTP
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', border: '1px solid #69AC77', borderRadius: '1em', padding: 2 }}>
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
              <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={handleSubmit}>Ya, Simpan</Button>
            </div>
          </form>
      </Paper>
      <Modal
        open={successOpen}
        onClose={handleSuccessClose}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="success-modal-title" variant="h6" component="h2">
            Penyewa Berhasil Ditambahkan
          </Typography>
          <Typography id="success-modal-description" sx={{ mt: 2 }}>
            Data penyewa baru telah berhasil ditambahkan.
          </Typography>
          <Box mt={2} textAlign="center">
            <Button onClick={handleSuccessClose} style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 2em', borderRadius: '2em', width: '12em', height: '3em' }}>
              Tutup
            </Button>
          </Box>
        </Box>
      </Modal>
      <ErrorModal
        message={errorMessage}
      />
    </Grid>
  );
};

export default Tambah;
