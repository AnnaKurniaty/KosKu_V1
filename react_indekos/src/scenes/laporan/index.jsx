import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; 
import Header from "../../components/Header";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosClient from "../../axios-client.js";
import { useLocation } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
    </GridToolbarContainer>
  );
};

const Laporan = () => {
  const theme = useTheme();
  const [financialData, setFinancialData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month() + 1);
  const [selectedYear, setSelectedYear] = useState(selectedDate.year());
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailType, setDetailType] = useState(""); // 'income' atau 'expense'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state && location.state.userId) {
          const response = await axiosClient.get(`/laporan/${location.state.userId}`);
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
    pemasukan: item.biaya_pemasukan || '',
    tgl_pengeluaran: (financialData.expense[index] && financialData.expense[index].tanggal_pengeluaran) || '-',
    pengeluaran: (financialData.expense[index] && financialData.expense[index].biaya_pengeluaran) || '-',
  }));

  const columns = [
    { field: 'tgl_pemasukan', headerName: 'Tanggal Pemasukan', flex: 1, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY')  },
    { field: 'pemasukan', headerName: 'Pemasukan', flex: 1 },
    { field: 'tgl_pengeluaran', headerName: 'Tanggal Pengeluaran', flex: 1, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY')  },
    { field: 'pengeluaran', headerName: 'Pengeluaran', flex: 1 },
  ];

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setSelectedMonth(newValue.month() + 1); // +1 karena bulan dimulai dari 0
    setSelectedYear(newValue.year());
  };  

  const filteredRows = rows.filter((item) => {
    const date = item.tgl_pemasukan ? dayjs(item.tgl_pemasukan) : dayjs(item.tgl_pengeluaran);
    return (
      date.month() + 1 === selectedMonth && // +1 karena month() dimulai dari 0
      date.year() === selectedYear
    );
  });  

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Tanggal Pemasukan", "Pemasukan", "Tanggal Pengeluaran", "Pengeluaran"];
    const tableRows = rows.map(item => [
      item.id,
      item.tgl_pemasukan || '-',
      item.pemasukan || '-',
      item.tgl_pengeluaran || '-',
      item.pengeluaran || '-',
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Laporan Pemasukan dan Pengeluaran", 14, 15);
    doc.save('financial_report.pdf');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const DetailPopup = ({ open, onClose, rowData, type }) => {
    // Ensure rowData is defined before accessing its properties
    if (!rowData) {
      return null; // or handle the case where rowData is not available
    }
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Detail {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</DialogTitle>
        <DialogContent>
          <Typography>
            Tanggal: {type === 'income' ? rowData.tgl_pemasukan || '-' : rowData.tgl_pengeluaran || '-'}
          </Typography>
          <Typography>
            Biaya: {type === 'income' ? rowData.pemasukan || '-' : rowData.pengeluaran || '-'}
          </Typography>
          <Typography>
            Keterangan: {type === 'income' ? rowData.keterangan || '-' : rowData.keterangan || '-'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Tutup</Button>
        </DialogActions>
      </Dialog>
    );
  };  

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    if (params.row.tgl_pemasukan) {
      setDetailType('income');
    } else {
      setDetailType('expense');
    }
    setDetailOpen(true);
  };

  // Menghitung total pemasukan
  const totalPemasukan = filteredRows.reduce((acc, curr) => {
    if (curr.pemasukan && !isNaN(curr.pemasukan)) {
      return acc + parseFloat(curr.pemasukan);
    }
    return acc;
  }, 0);

  // Menghitung total pengeluaran
  const totalPengeluaran = filteredRows.reduce((acc, curr) => {
    if (curr.pengeluaran && !isNaN(curr.pengeluaran)) {
      return acc + parseFloat(curr.pengeluaran);
    }
    return acc;
  }, 0);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Pemasukan dan Pengeluaran" />
      <Box display="flex" justifyContent="space-between" mb={2} >
        <div style={{backgroundColor:'#FF9900'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input ref={inputRef} {...inputProps} style={{ display: 'none' }} />
                {InputProps?.endAdornment}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CalendarTodayIcon />}
                  onClick={InputProps?.onClick}
                >
                  {selectedDate.format("MMMM YYYY")}
                </Button>
              </Box>
            )}
          />
        </LocalizationProvider>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMenuClick}
          sx={{ ml: 2 }}
          style={{backgroundColor:'#FF9900'}}
        >
          Download Laporan
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <CSVLink data={rows} filename={"financial_report.csv"} style={{ textDecoration: 'none', color: 'inherit' }}>
              .csv
            </CSVLink>
          </MenuItem>
          <MenuItem onClick={() => { exportPDF(); handleMenuClose(); }}>
            .pdf
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ height: 450 }} backgroundColor={theme.palette.background.alt}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          loading={loading}
          onRowClick={handleRowClick}
          columnBuffer={8}
        />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ mr: 2 }}>
            <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
              Total Pemasukan:
            </Typography>{' '}
            <Typography variant="subtitle2" component="span">
              Rp {totalPemasukan.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
              Total Pengeluaran:
            </Typography>{' '}
            <Typography variant="subtitle2" component="span">
              Rp {totalPengeluaran.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        </Box>
        <DetailPopup
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        rowData={selectedRow}
        type={detailType}
      />
    </Box>
  );
};

export default Laporan;
