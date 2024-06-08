import { useState, useEffect } from "react";
import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import axiosClient from "../../axios-client.js";
import { useLocation } from 'react-router-dom';

const CustomGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
  color: theme.palette.primary.dark,
  '&:hover': {
    color: theme.palette.secondary[500],
  },
}));

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <CustomGridToolbarExport />
    </GridToolbarContainer>
  );
};

const Laporan = () => {
  const theme = useTheme();
  const [financialData, setFinancialData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state && location.state.userId) {
          console.log("INI STATE : ", location.state);
          const response = await axiosClient.get(`/laporan/${location.state.userId}`);
          console.log("Response data:", response.data); // Debugging log
          const data = response.data;
          setFinancialData({
            income: data.pemasukan || [],
            expense: data.pengeluaran || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const rows = [...(financialData.income || []), ...(financialData.expense || [])].map((item, index) => ({
    id: index + 1,
    tgl_pemasukan: item.tgl_pemasukan || '',
    pemasukan: item.pemasukan || '',
    tgl_pengeluaran: item.tgl_pengeluaran || '',
    pengeluaran: item.pengeluaran || '',
  }));

  console.log("Rows data:", rows); // Debugging log

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 50 },
    { field: 'tgl_pemasukan', headerName: 'Tanggal Pemasukan', minWidth: 200 },
    { field: 'pemasukan', headerName: 'Pemasukan', minWidth: 200 },
    { field: 'tgl_pengeluaran', headerName: 'Tanggal Pengeluaran', minWidth: 200 },
    { field: 'pengeluaran', headerName: 'Pengeluaran', minWidth: 200 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Pemasukan dan Pengeluaran" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Box>
            <div className="app-select">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Bulan dan Tahun"
                  views={['month', 'year']}
                />
              </LocalizationProvider>
            </div>
          </Box>
        </Box>
        <Box sx={{ height: 500 }} backgroundColor={theme.palette.background.alt}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            components={{ Toolbar: CustomToolbar }}
            loading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Laporan;
