/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import axiosClient from '../../axios-client'; // Ensure this path is correct

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.2),
  '& .MuiCheckbox-root': {
    padding: theme.spacing(0.2),
  },
  '& .MuiTypography-root': {
    fontSize: '12px',
  },
}));

const FormGroupContainer = styled(FormGroup)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2px',
});

const UpdateKamar = ({ kamar, style, fasilitasKamarList, gedungId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [formData, setFormData] = useState({
    nama_kamar: kamar.nama_kamar,
    biaya_kamar: kamar.biaya_kamar,
    status_kamar: kamar.status_kamar,
    gambar_kamar: null,
  });

  const [idFasilitasList, setIdFasilitasList] = useState(Array.isArray(kamar.id_fasilitas_list) ? kamar.id_fasilitas_list : []);

  useEffect(() => {
    setIdFasilitasList(Array.isArray(kamar.id_fasilitas_list) ? kamar.id_fasilitas_list : []);
  }, [kamar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const [selectedFasilitasIds, setSelectedFasilitasIds] = useState(kamar.id_fasilitas_list.split(',').map(item => parseInt(item.trim(), 10)) || []);

  const handleCheckboxChange = (id) => {
    if (selectedFasilitasIds.includes(id)) {
      console.log("MASUK SINI");
      setSelectedFasilitasIds(selectedFasilitasIds.filter((fid) => fid !== id));
    } else {
      setSelectedFasilitasIds([...selectedFasilitasIds, id]);
    }
  };

  const handleSubmitKamar = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id_gedung', gedungId);
    data.append('nama_kamar', formData.nama_kamar);
    data.append('biaya_kamar', formData.biaya_kamar);
    idFasilitasList.forEach(id => {
      data.append('id_fasilitas_list[]', id);
    });
    if (formData.gambar_kamar) {
      data.append('gambar_kamar', formData.gambar_kamar);
    }

    try {
      const response = await axiosClient.post(`/kamar/update/${kamar.id_kamar}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error:', error.response.data.errors);
      setErrorMessage(error.response.data.message);
      handleOpen();
    }
  };

  return (
    <>
      <Button style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Detail Kamar</h3>
          <form onSubmit={handleSubmitKamar}>
            <Typography id="error-modal-description" sx={{ mt: 2, color: 'red', fontSize: '0.5rem' }}>
              {errorMessage}
            </Typography>
            <TextField
              label='Nama Kamar'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.nama_kamar}
              onChange={handleChange}
              name='nama_kamar'
              InputLabelProps={{ style: { color: "black" } }}
            />
            <TextField
              label='Biaya Kamar'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.biaya_kamar}
              onChange={handleChange}
              name='biaya_kamar'
              InputLabelProps={{ style: { color: "black" } }}
            />
            <div style={{ display: 'flex', alignItems: 'left', marginTop: '10px' }}>
              <Typography>Fasilitas* </Typography>
              <Typography variant="caption">(Pilih dengan menekan fasilitas)</Typography>
            </div>
            <FormGroupContainer>
              {fasilitasKamarList.map((fs, index) => (
                <StyledFormControlLabel
                  key={index}
                  control={
                    <Checkbox 
                      color="success"
                      checked={selectedFasilitasIds.includes(fs.id_fasilitas)}
                      onChange={() => handleCheckboxChange(fs.id_fasilitas)}
                    />
                  }
                  label={fs.nama_fasilitas}
                />
              ))}
            </FormGroupContainer>
            <TextField
              label='Status Kamar'
              variant='standard'
              color='warning'
              fullWidth
              value={formData.status_kamar}
              onChange={handleChange}
              name='status_kamar'
              InputLabelProps={{ style: { color: "black" } }}
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
                    name='gambar_kamar'
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
              <Button style={{ margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} onClick={handleClose}>Kembali</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateKamar;
