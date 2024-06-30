import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios-client";
import React, { useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const HapusKamar = ({
    style,
    id_kamar,
    fetchData,
}) => {
    const btnstyle1 = { margin: '0.2em', backgroundColor: '#FF9900', color: "white", borderRadius: '0.5em' };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false)};
    const handleOpen = () => {setOpen(true)};
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.delete(`/kamar/delete/${id_kamar}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Response:', response.data);
            setSuccessMessage('Kamar berhasil dihapus');
            handleClose();
            fetchData();
        } catch (error) {
            console.error('Error:', error.response.data);
            setErrorMessage('Kamar gagal dihapus');
        }
    }

    return (
        <>
            <IconButton style={btnstyle1} onClick={handleOpen}><DeleteIcon /></IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 320, padding: 2, border:'1px solid #69AC77' }} align="center">
                    <form onSubmit={onDelete}>
                        <h3 id="parent-modal-title" textstyle="bold">Hapus Kamar yang Dipilih ?</h3>
                        <div align="center">
                            <Button type='submit' style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }} >Ya, hapus</Button>
                            <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '3em' }}>Kembali</Button>
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

export default HapusKamar;