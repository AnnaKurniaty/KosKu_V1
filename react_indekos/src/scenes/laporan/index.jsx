import { useState } from "react";
import * as React from 'react';
import { Box, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const CustomGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
  color: theme.palette.primary.dark,// Change this to any color you prefer
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
  
  const [data, setData] = useState([
    { id: 1, tgl_pemasukan: '25 Januari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '23 Januari 2024', pengeluaran: '20.000' },
    { id: 2, tgl_pemasukan: '25 Februari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '28 Januari 2024', pengeluaran: '200.000' },
    { id: 3, tgl_pemasukan: '25 Februari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '', pengeluaran: '' },
    { id: 4, tgl_pemasukan: '25 Februari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '', pengeluaran: '' },
    { id: 5, tgl_pemasukan: '25 Februari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '', pengeluaran: '' },
    { id: 6, tgl_pemasukan: '25 Februari 2024', pemasukan: '10.000.000', tgl_pengeluaran: '', pengeluaran: '' },
  ]);

  const columns= [
    { field: 'id', headerName: 'id', minWidth: 50  },
    { field: 'tgl_pemasukan', headerName: 'Tanggal', minWidth: 200  },
    { field: 'pemasukan', headerName: 'Pemasukan', minWidth: 200  },
    { field: 'tgl_pengeluaran', headerName: 'Tanggal', minWidth: 200  },
    { field: 'pengeluaran', headerName: 'Pengeluaran', minWidth: 200  },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Pemasukan dan Pengeluaran"/>
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Box>
            <div className="app-select">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label={'"Bulan" and "Tahun"'} views={['month', 'year']} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Box>
        </Box>
        <Box sx={{ height: 500 }} backgroundColor={theme.palette.background.alt}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              components={{ Toolbar: CustomToolbar }}
            />
          </Box>
      </Box>
    </Box>
  );
};

export default Laporan;