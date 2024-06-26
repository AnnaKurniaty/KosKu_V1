import { Box, Button, Modal, Typography } from "@mui/material";
import axiosClient from "../../axios-client";
import React, { useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const HapusPenyewa = ({
    style,
    id_menyewa,
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
            const response = await axiosClient.delete(`/penyewa/${id_menyewa}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Response:', response.data);
            setSuccessMessage('Penyewa berhasil dihapus');
            handleClose();
            fetchData();
        } catch (error) {
            console.error('Error:', error.response.data);
            setErrorMessage('Penyewa Gagal dihapus');
        }
    }

    return (
        <>
            <Button style={{margin:'0.5em', backgroundColor:'#FF9900', color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '7em', height:'3em'}} onClick={handleOpen}>Hapus</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 320, padding: 2 }} align="center">
                    <form onSubmit={onDelete}>
                        <h3 id="parent-modal-title" textstyle="bold">Hapus Penyewa yang Dipilih ?</h3>
                        <div align="center">
                            <Button type='submit' onClick={onDelete} style={{ margin: '0.5em', backgroundColor: '#E21111', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }} >Ya, hapus</Button>
                            <Button type='button' onClick={handleClose} style={{ margin: '0.5em', backgroundColor: '#69AC77', color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: '7em', height: '2em' }}>Kembali</Button>
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

export default HapusPenyewa;