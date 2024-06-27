import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import {
  useTheme,
  useMediaQuery,
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const [penyewaList, setPenyewaList] = useState([]);
  const [roomData, setRoomData] = useState({ occupied: 0, vacant: 0 });
  const [financialData, setFinancialData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const location = useLocation();

  const paperStyle = { padding: 20, height: "auto", overflowX: 'auto', width:'auto', margin: "20px auto 25px auto", backgroundColor: theme.palette.background.alt, borderRadius: "1em", border: '1px solid #69AC77', boxShadow: '3' };
  const btnStyle = {
    backgroundColor: "#FF9900",
    color: "white",
    padding: isLargeScreen ? '0.5em' : '0.5em 0',
    borderRadius: "0.5em",
    height: "2em",
    width: "auto",
    fontSize: isLargeScreen ? '1rem' : '0.80rem',
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: "5px",
    marginRight: "-5px",
  };
  const xLabels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state && location.state.userId) {
          setUserId(location.state.userId);
          const terisiResponse = await axiosClient.get(`/informasi-kos/kamar-terisi/${location.state.userId}`);
          const kosongResponse = await axiosClient.get(`/informasi-kos/kamar-kosong/${location.state.userId}`);
          const penyewaResponse = await axiosClient.get(`/informasi-kos/penyewa-jatuh-tempo/${location.state.userId}`);
          const pemasukanResponse = await axiosClient.get(`/informasi-kos/pemasukan/${location.state.userId}`);
          const pengeluaranResponse = await axiosClient.get(`/informasi-kos/pengeluaran/${location.state.userId}`);

          const terisiData = terisiResponse.data;
          const kosongData = kosongResponse.data;
          const penyewaData = penyewaResponse.data;
          const pemasukanData = pemasukanResponse.data;
          const pengeluaranData = pengeluaranResponse.data;

          setRoomData({
            occupied: terisiData.jumlah_kamar_terisi,
            vacant: kosongData.jumlah_kamar_kosong,
          });
          setPenyewaList({penyewaList: penyewaData.penyewa_jatuh_tempo});

          const income = Array(12).fill(0);
          const expense = Array(12).fill(0);

          pemasukanData.pemasukan.forEach((item) => {
            income[item.bulan - 1] = item.total_pemasukan;
          });

          pengeluaranData.pengeluaran.forEach((item) => {
            expense[item.bulan - 1] = item.total_pengeluaran;
          });

          setFinancialData({
            income: income,
            expense: expense,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, location.pathname]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLanjutClick = async (id_menyewa) => {
    try {
      setLoading(true);
      const response = await axiosClient.post(`/informasi-kos/update_lanjut/${id_menyewa}`);
      const newMenyewa = response.data.menyewa;
      
      // Memperbarui state penyewa setelah menambahkan data baru
      setPenyewaList([...penyewaList, newMenyewa]); // Perbaiki penggunaan penyewaList di sini
    } catch (error) {
      console.error("Gagal menambahkan data baru", error);
      // Handle error state di sini jika diperlukan
    } finally {
      setLoading(false);
    }
  };

  const handleTidakClick = async (id_menyewa) => {
    try {
      setLoading(true);
      const response = await axiosClient.post(`/informasi-kos/update_tidak/${id_menyewa}`);
      const newMenyewa = response.data.menyewa;
      
      // Memperbarui state penyewa setelah menambahkan data baru
      setPenyewaList([...penyewaList, newMenyewa]); // Perbaiki penggunaan penyewaList di sini
    } catch (error) {
      console.error("Gagal menambahkan data baru", error);
      // Handle error state di sini jika diperlukan
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const steps = ["Jumlah Ketersediaan Kamar", "Pengingat Jatuh Tempo", "Grafik Pemasukan dan Pengeluaran"];

  return (
    <Box m="1.5rem 2.5rem">
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
          Informasi Kos
        </Typography>
      </Box>
      <Box>
        {activeStep === 0 && (
          <Paper style={paperStyle}>
            {roomData.occupied === 0 && roomData.vacant === 0 ? (
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary[100], textAlign: "center" }}
              >
                Data ketersediaan kamar tidak tersedia.
              </Typography>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gridColumn="span 12"
                gridRow="span 3"
                backgroundColor={theme.palette.background.alt}
                p="1.5rem"
                borderRadius="0.55rem"
              >
                <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
                  Jumlah Ketersediaan Kamar
                </Typography>
                <Box display="flex" justifyContent="center" sx={{ paddingLeft:10 }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: roomData.occupied, label: `${roomData.occupied} Kamar Terisi`, color: "#F2CA25" },
                          { id: 1, value: roomData.vacant, label: `${roomData.vacant} Kamar Kosong`, color: "#FF5B45" },
                        ],
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: "row",
                        position: { vertical: "bottom", horizontal: "middle" },
                      },
                    }}
                    height={isLargeScreen ? 400 : 350}
                    width={isLargeScreen ? 400 : 280} 
                    />
                    </Box>
                  </Box>
                )}
              </Paper>
            )}
            {activeStep === 1 && (
              <Box
                gridColumn="span 12"
                gridRow="span 3"
                backgroundColor={theme.palette.background.alt}
                p="1.5rem"
                border= '1px solid #69AC77'
                boxShadow='3'
                borderRadius="2rem"
                marginTop={2}
                sx={{ maxHeight: 500, overflowY: "auto" }}
              >
                <Typography
                  variant="h5"
                  paddingTop="20px"
                  sx={{ color: theme.palette.secondary[100] }}
                  align="center"
                  fontWeight="bold"
                >
                  Pengingat Jatuh Tempo
                </Typography>
                <Box
                  mt="20px"
                  display="grid"
                  sx={{
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                    gap: "20px"
                  }}
                >
                  {penyewaList.length === 0 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.secondary[100], textAlign: "center" }}
                    >
                      Tidak ada penyewa yang jatuh tempo.
                    </Typography>
                  ) : (
                    penyewaList.map((penyewa_jatuh_tempo) => (
                      <Box
                        key={penyewa_jatuh_tempo.id_menyewa}
                        sx={{
                          padding: isLargeScreen ? "1.5em" : "1em",
                          gridColumn: isNonMediumScreens ? undefined : "span 12",
                          boxShadow: "3",
                          borderRadius: "2em",
                          backgroundColor: "#F9F4F4",
                          "@media (minWidth:600px)": {
                            height: "100px",
                          },
                          "@media (minWidth:960px)": {
                            height: "110px",
                          },
                          "@media (minWidth:1280px)": {
                            height: "110px",
                            paddingRight: "3em",
                          },
                        }}
                        marginBottom={2}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", marginBottom: "auto" }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                            <AccountCircleOutlinedIcon sx={{fontSize: 42, color: '#black'}}/>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'1em'}}>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color: theme.palette.secondary[100],
                                  fontSize: isLargeScreen ? '2rem' : '1rem',
                                }}
                              >
                                {penyewa_jatuh_tempo.nama_lengkap}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.secondary[100],
                                  fontSize: isLargeScreen ? '1rem' : '0.80rem',
                                }}
                              >
                                {penyewa_jatuh_tempo.tanggal_selesai_sewa}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.secondary[100],
                                  fontSize: isLargeScreen ? '1rem' : '0.80rem',
                                }}
                              >
                                Rp.{penyewa_jatuh_tempo.biaya_kamar}
                              </Typography>
                            </div>
                          </div>
                          <div style={buttonContainerStyle}>
                            <Button type="submit" style={btnStyle} onClick={() => handleLanjutClick(penyewa_jatuh_tempo.id_menyewa)}>
                              Lanjut
                            </Button>
                            <Button type="submit" style={btnStyle} onClick={() => handleTidakClick(penyewa_jatuh_tempo.id_menyewa)}>
                              Tidak
                            </Button>
                          </div>
                        </div>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Paper style={{ ...paperStyle}}>
                <Box gridColumn="span 12" gridRow="span 3" backgroundColor={theme.palette.background.alt} borderRadius="1em">
                  <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
                    Grafik Pemasukan dan Pengeluaran
                  </Typography>
                  <LineChart
                    xAxis={[
                      {
                        scaleType: "point",
                        data: xLabels,
                      },
                    ]}
                    series={[
                      {
                        id: "Pemasukan",
                        label: "Pemasukan",
                        data: financialData.income,
                        color: "#F2CA25",
                      },
                      {
                        id: "Pengeluaran",
                        label: "Pengeluaran",
                        data: financialData.expense,
                        color: "#FF5B45",
                      },
                    ]}
                    height={410}
                    width={400}
                    margin={{ left: 70 }}
                    position="relative"
                  />
                </Box>
              </Paper>
            )}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <ArrowCircleLeftIcon sx={{fontSize: 42, color: '#69AC77'}} disabled={activeStep === 0} onClick={handleBack} variant="contained">Sebelumnya
            </ArrowCircleLeftIcon>
            <ArrowCircleRightIcon sx={{fontSize: 42, color: '#69AC77'}} disabled={activeStep === steps.length - 1} onClick={handleNext} variant="contained">Selanjutnya
            </ArrowCircleRightIcon>
          </Box>
        </Box>
      );
    };
    
    export default Dashboard;
    