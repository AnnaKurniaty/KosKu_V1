import React from 'react'
import { Box, useTheme, useMediaQuery, Typography, Button} from '@mui/material'
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import QRCode from 'react-qr-code';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  export default function Penyewa() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen1 = () => {
        setOpen1(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    function ChildModal() {
        const theme = useTheme()
        const btnstyle={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
        const [open2, setOpen2] = React.useState(false);
        const handleOpen2 = () => {
          setOpen2(true);
        };
        const handleClose2 = () => {
          setOpen2(false);
        };
      
        return (
          <React.Fragment>
            <Button onClick={handleOpen2} style={btnstyle}>Sudah</Button>
            <Modal
              open={open2}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Masa Perpanjang Sewa</h2>
                <p id="child-modal-description">
                  Apakah penyewa akan melakukan perpanjang sewa di bulan depan?
                </p>
                <Button type='submit' style={btnstyle} 
                onClick={handleClose}>Ya, diperpanjang 1 bulan</Button>
                <Button type='submit' style={btnstyle} 
                onClick={handleClose}>Tidak</Button>
              </Box>
            </Modal>
          </React.Fragment>
        );
      }
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const btnstyle={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
    const btnstyle1={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', float:'right', borderRadius: '0.5em', width: '10em'}
    return (
        <Box m='1.5rem 2.5rem'>
            <Button type='submit' style={btnstyle1} onClick={handleOpen1}>Tambah</Button>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }} align="center">
                    <h2 id="parent-modal-title">Tambah Penyewa</h2>
                    <p id="parent-modal-description">
                        <QRCode
                            value="http://localhost:3000/penyewa"
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </p>
                </Box>
            </Modal>
            <Header title='Daftar Identitas Penyewa' subTitle='List of Penyewa'/>
            <Box
                mt="20px"
                display="grid"
                gap="20px"
            >
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Syahda Dhiya Ulhaq T
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Syelvie Ira Ratna M
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Zahwa Putri Hamida
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Rifatia Yumna Salma
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Fanny Putria Agustina
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Nabiilah Nada Iswari
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Hasanah
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Diana Fauzia
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="1.25rem 1rem"
                flex="1 1 100%"
                backgroundColor={theme.palette.background.alt}
                borderRadius="0.55rem"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <Typography variant="h3" sx={{ color: theme.palette.secondary[100] }}>
                                Anna Kurniaty
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                Aktif
                            </Typography>
                        </div>
                        <div style={{marginLeft: 'auto'}}>
                            <Button type='submit' style={btnstyle} onClick={handleOpen}>Ubah <br /> Status</Button>
                            <Modal
                                open={open}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }} align="center">
                                <h2 id="parent-modal-title">Pembayaran</h2>
                                <p id="parent-modal-description">
                                    Apakah penyewa telah melakukan pembayaran atau perpanjangan?
                                </p>
                                <ChildModal />
                                <Button type='submit' style={btnstyle} 
                                onClick={handleClose}>Belum</Button>
                                </Box>
                            </Modal>
                            <Button type='submit' style={btnstyle} 
                                onClick={() => {
                                    navigate('/detail penyewa');
                                }}>Lihat <br /> Detail</Button>
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

