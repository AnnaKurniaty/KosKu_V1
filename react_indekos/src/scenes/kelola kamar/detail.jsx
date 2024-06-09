/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Edit from './update.jsx';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(0.2), // Adjust the spacing between items
  '& .MuiCheckbox-root': {
    padding: theme.spacing(0.2), // Adjust the padding of the checkbox
  },
  '& .MuiTypography-root': {
    fontSize: '12px', // Adjust the font size of the label text
  },
}));

const FormGroupContainer = styled(FormGroup)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two columns
  gap: '2px', // Adjust the gap between the columns
});

const Detail = ({
  kamar,
  style,
  handleTab,
  fasilitasKamarList,
}) => {
  const btnstyle = { margin: '0.5em', backgroundColor: '#FF9900', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '10em' };
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };

  //For Input
  const [formData, setFormData] = useState({
    'nama_kamar': kamar.nama_kamar,
    'biaya_kamar': kamar.biaya_kamar,
    'status_kamar': kamar.status_kamar,
    'gambar_kamar': null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const [idFasilitasList, setIdFasilitasList] = useState(kamar.id_fasilitas_list || []);

  return (
    <>
      <Button style={btnstyle} onClick={handleOpen}>Lihat Detail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
          <h3 id="parent-modal-title" textstyle="bold">Detail Kamar</h3>
          <form>
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
              value={formData.biaya_kamar}
              onChange={handleChange}
              name='biaya_kamar'
              InputLabelProps={{
                style: { color: "black" }
              }}
              InputProps={{
                readOnly: true,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'left', marginTop: '10px' }}>
              <Typography>
                Fasilitas*
              </Typography>
              <Typography variant="caption">
                (Pilih dengan menekan fasilitas)
              </Typography>
            </div>
            <FormGroupContainer>
              {fasilitasKamarList.map((fs, index) => (
                <StyledFormControlLabel
                  key={index}
                  control={<Checkbox
                    color="success"
                    checked={idFasilitasList.includes(fs.id_fasilitas)}
                    value={fs.id_fasilitas} 
                    InputProps={{
                      readOnly: true,
                    }}
                  />}
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
              name='status_kamar'
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
                kamar={kamar}
                handleTab={handleTab}
                fasilitasKamarList={fasilitasKamarList}
              />
              <Button type='submit' style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleClose}>Kembali</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Detail;
