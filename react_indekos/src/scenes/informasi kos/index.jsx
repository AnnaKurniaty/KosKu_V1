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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const [penyewa, setPenyewa] = useState([]);
  const [roomData, setRoomData] = useState({ occupied: 0, vacant: 0 });
  const [financialData, setFinancialData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const location = useLocation();

  const paperStyle = { padding: 20, height: "auto", width: "auto", margin: "20px auto 25px auto", backgroundColor: theme.palette.background.alt, borderRadius: "1em" };
  const btnStyle = {
    backgroundColor: "#FF9900",
    color: "white",
    padding: "0.5em 0",
    borderRadius: "0.5em",
    height: "2em",
    width: "auto",
    "@media (min-width:600px)": {
      padding: "0.6em 0",
      height: "2.5em",
      margin: 10,
    },
    "@media (min-width:960px)": {
      padding: "0.7em 0",
      height: "3em",
      margin: 15,
    },
    "@media (min-width:1280px)": {
      padding: "0.8em 0",
      height: "3.5em",
      margin: 20,
    },
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "5px",
    marginRight: "5px",
    fontSize: "0.55rem",
    "@media (min-width:600px)": {
      fontSize: "0.65rem",
    },
    "@media (min-width:960px)": {
      fontSize: "0.75rem",
    },
    "@media (min-width:1280px)": {
      fontSize: "0.85rem",
    },
  };
  const xLabels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state && location.state.userId) {
          setUserId(location.state.userId);
          const response = await axiosClient.get(`/dashboard/${location.state.userId}`);
          const data = response.data;

          setRoomData({
            occupied: data.jumlah_kamar_terisi,
            vacant: data.jumlah_kamar_kosong,
          });
          setPenyewa(data.penyewa_selesai_sewa_dua_minggu_terakhir);

          // Mengatur data pemasukan dan pengeluaran untuk grafik
          const income = Array(12).fill(0);
          const expense = Array(12).fill(0);

          data.pemasukan.forEach((item) => {
            income[item.bulan - 1] = item.total_pemasukan;
          });

          data.pengeluaran.forEach((item) => {
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

  const handleLanjutClick = async (penyewaId) => {
    try {
      console.log("Sending payload:", { id_penyewa: penyewaId });
      const response = await axiosClient.post(`/dashboard/pemasukan/${penyewaId}`, {
        id_penyewa: penyewaId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to add pemasukan", error);
      if (error.response) {
        console.error(error.response.data);
      }
    }
  };

  const handleTidakClick = async (penyewaId) => {
    try {
      console.log("Sending payload:", { id_penyewa: penyewaId });
      const response = await axiosClient.patch(`/dashboard/penyewa/status/${penyewaId}`, {
        id_penyewa: penyewaId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to update penyewa status", error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                <Box display="flex" justifyContent="center">
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
                        position: { vertical: "bottom", horizontal: "center" },
                        padding: 10,
                      },
                    }}
                    height={350}
                    width={280}
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
            borderRadius="2rem"
            marginTop={2}
            sx={{ maxHeight: 500, overflow: "auto" }}
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
              gridTemplateColumns={theme.breakpoints.up("lg") ? "repeat(2, 1fr)" : "repeat(1, 1fr)"}
              gap="20px"
            >
              {penyewa.length === 0 ? (
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.secondary[100], textAlign: "center" }}
                >
                  Tidak ada penyewa yang jatuh tempo.
                </Typography>
              ) : (
                penyewa.map((user) => (
                  <Box
                    key={user.id}
                    display="grid"
                    gridAutoRows="100px"
                    gap="20px"
                    pb={0}
                    sx={{
                      "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                      boxShadow: "3",
                      borderRadius: "2em",
                      backgroundColor: "#F9F4F4",
                      "@media (min-width:600px)": {
                        height: "100px",
                      },
                      "@media (min-width:960px)": {
                        height: "110px",
                      },
                      "@media (min-width:1280px)": {
                        height: "110px",
                        paddingRight: "3em",
                      },
                    }}
                    marginBottom={2}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", marginBottom: "auto" }}>
                      <div>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.secondary[100],
                            marginLeft: "1em",
                            fontSize: "calc(1vw + 0.6em)",
                            "@media (min-width:600px)": {
                              fontSize: "calc(1vw + 0.6em)",
                            },
                            "@media (min-width:960px)": {
                              fontSize: "calc(0.7vw + 0.7em)",
                            },
                            "@media (min-width:1280px)": {
                              fontSize: "calc(0.7vw + 0.8em)",
                              marginLeft: "4em",
                            },
                          }}
                        >
                          {user.nama_lengkap}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.secondary[100],
                            marginLeft: "1.5em",
                            fontSize: "calc(0.5vw + 0.5em)",
                            "@media (min-width:600px)": {
                              fontSize: "calc(0.5vw + 0.5em)",
                            },
                            "@media (min-width:960px)": {
                              fontSize: "calc(0.5vw + 0.5em)",
                            },
                            "@media (min-width:1280px)": {
                              fontSize: "calc(0.5vw + 0.5em)",
                              marginLeft: "6em",
                            },
                          }}
                        >
                          {user.tanggal_selesai_sewa}
                        </Typography>
                      </div>
                      <div style={buttonContainerStyle}>
                        <Button type="submit" style={btnStyle} onClick={() => handleLanjutClick(user.id_penyewa)}>
                          Lanjut
                        </Button>
                        <Button type="submit" style={btnStyle} onClick={() => handleTidakClick(user.id_penyewa)}>
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
          <Paper style={paperStyle}>
            <Box gridColumn="span 12" gridRow="span 3" backgroundColor={theme.palette.background.alt} borderRadius="1em">
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
                Grafik Pemasukan dan Pengeluaran
              </Typography>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: xLabels,
                    labels: {
                      angle: -270,
                      align: "right",
                      verticalAlign: "middle",
                      offset: 10,
                    },
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
                margin={{ left: 70 }}
                position="relative"
              />
            </Box>
          </Paper>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
          Sebelumnya
        </Button>
        <Button disabled={activeStep === steps.length - 1} onClick={handleNext} variant="contained">
          Sesudah
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
