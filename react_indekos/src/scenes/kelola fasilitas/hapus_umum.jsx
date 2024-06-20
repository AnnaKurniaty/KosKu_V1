/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Button, IconButton, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios-client";
import React from "react";


const HapusFasilitas = ({
    style,
    id_fasilitas,
    fetchData,
}) => {
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = () => {setOpen(true)};

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post(`/fasilitas-umum/delete/${id_fasilitas}`, {
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
            console.error('Error:', error.response.data);
            // Implement logic for handling errors, e.g., showing an error message to the user
        }
    }

    return (
        <>
            <Button style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'2em'}} onClick={handleOpen}>Hapus</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 350, padding: 2 }} align="center">
                    <form onSubmit={onDelete}>
                        <h3 id="parent-modal-title" textstyle="bold">Hapus Fasilitas yang Dipilih ?</h3>
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

export default HapusFasilitas;