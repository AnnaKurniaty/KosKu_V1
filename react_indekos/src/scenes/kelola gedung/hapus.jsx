/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, IconButton, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios-client";


const HapusGedung = ({
    style,
    handleOpen2,
    open2,
    handleClose,
    id_gedung,
    fetchData,
}) => {
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.delete(`/gedung/${id_gedung}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Response:', response.data);
            // Implement logic for handling successful submission, e.g., showing a success message or redirecting to another page
        } catch (error) {
            console.error('Error:', error.response.data);
            // Implement logic for handling errors, e.g., showing an error message to the user
        }
        handleClose();
        fetchData();
    }

    return (
        <>
            <IconButton style={btnstyle1} onClick={handleOpen2}><DeleteIcon /></IconButton>
            <Modal
                open={open2}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                    <form onSubmit={onDelete}>
                        <h3 id="parent-modal-title" textstyle="bold">Hapus Gedung yang Dipilih ?</h3>
                        <div align="center">
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} >Ya, hapus</Button>
                            <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Kembali</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default HapusGedung;