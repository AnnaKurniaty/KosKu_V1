import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useTheme, useMediaQuery, Box, Paper, Typography, Button, CircularProgress } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [penyewa, setPenyewa] = useState([]);
  const [roomData, setRoomData] = useState({ occupied: 0, vacant: 0 });
  const [financialData, setFinancialData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const location = useLocation();

  const paperStyle = { padding: 20, height: "auto", width: "auto", margin: "20px auto 25px auto", backgroundColor: theme.palette.background.alt, borderRadius: '1em' };
  const paperStyle1 = { padding: 20, height: "450px", width: "auto", margin: "20px auto 25px auto", backgroundColor: theme.palette.background.alt, borderRadius: '1em' };
  const btnStyle = { backgroundColor: theme.palette.secondary[500], color: "white", padding: '0.5em 0', borderRadius: '0.5em', width: 'auto', height: '2em' };
  const xLabels = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

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
          setFinancialData({
            income: [data.pemasukan],  
            expense: [data.pengeluaran],  
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
      // Log the payload
      console.log("Sending payload:", { id_penyewa: penyewaId });
  
      // Use backticks for template literals
      const response = await axiosClient.patch(`/dashboard/penyewa/status/${penyewaId}`, {
        id_penyewa: penyewaId,
      });
  
      // Log the response message
      console.log(response.data.message);
    } catch (error) {
      // Log the error
      console.error("Failed to update penyewa status", error);
    }
  };  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
          Dashboard
        </Typography>
      </Box>
      <Paper style={paperStyle}>
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
            Jumlah Ketersediaan Kamar
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: roomData.occupied, label: `${roomData.occupied} Kamar Terisi`, color: '#F2CA25' },
                  { id: 1, value: roomData.vacant, label: `${roomData.vacant} Kamar Kosong`, color: '#FF5B45' },
                ],
              },
            ]}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'middle', horizontal: 'right' },
                padding: 10,
              },
            }}
            height={150}
          />
        </Box>
      </Paper>
      <Paper style={paperStyle1}>
        <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
          Pengingat Jatuh Tempo
        </Typography>
        <Box mt="20px">
          {penyewa.map(user => (
            <Box
              key={user.id}
              display="grid"
              gridAutoRows="100px"
              gap="20px"
              sx={{
                "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                boxShadow: '2',
                borderRadius: '2em',
                backgroundColor: "#F9F4F4"
              }}
              marginBottom={2}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                  <Typography sx={{ color: theme.palette.secondary[100], marginLeft: '1em' }} width="120px">
                    {user.nama_lengkap}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.secondary[100], marginLeft: '1em' }}>
                    {user.tanggal_selesai_sewa}
                  </Typography>
                </div>
                <Button type='submit' style={btnStyle} onClick={() => handleLanjutClick(user.id_penyewa)}>Lanjut</Button>
                <Button type='submit' style={btnStyle} onClick={() => handleTidakClick(user.id_penyewa)}>Tidak</Button>
              </div>
            </Box>
          ))}
        </Box>
      </Paper>
      <Box
        gridColumn="span 12"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="1em"
      >
        <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
          Grafik Pemasukan dan Pengeluaran
        </Typography>
        <LineChart
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          series={[
            {
              id: 'Pemasukan',
              label: 'Pemasukan',
              data: financialData.income,
              color: '#F2CA25'
            },
            {
              id: 'Pengeluaran',
              label: 'Pengeluaran',
              data: financialData.expense,
              color: '#FF5B45'
            },
          ]}
          height={300}
          margin={{ left: 70 }}
          position="relative"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
