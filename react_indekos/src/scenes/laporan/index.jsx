import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Modal,
  useMediaQuery
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
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
  const [filteredData, setFilteredData] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month() + 1);
  const [selectedYear, setSelectedYear] = useState(selectedDate.year());
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailType, setDetailType] = useState(""); 
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (location.state && location.state.userId) {
          const pemasukanResponse = await axiosClient.get(`/laporan/pemasukan/${location.state.userId}`);
          const pengeluaranResponse = await axiosClient.get(`/laporan/pengeluaran/${location.state.userId}`);
          const pemasukanData = pemasukanResponse.data;
          const pengeluaranData = pengeluaranResponse.data;
          setFinancialData({
            income: pemasukanData.pemasukan || [],
            expense: pengeluaranData.pengeluaran || [],
          });
          filterData(pemasukanData.pemasukan || [], pengeluaranData.pengeluaran || []);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const filterData = (incomeData, expenseData) => {
    const filteredIncome = incomeData.filter(item =>
      dayjs(item.tgl_pemasukan).month() + 1 === selectedMonth && dayjs(item.tgl_pemasukan).year() === selectedYear
    );
    const filteredExpense = expenseData.filter(item =>
      dayjs(item.tgl_pengeluaran).month() + 1 === selectedMonth && dayjs(item.tgl_pengeluaran).year() === selectedYear
    );

    setFilteredData({
      income: filteredIncome,
      expense: filteredExpense,
    });
  };

  useEffect(() => {
    filterData(financialData.income, financialData.expense);
  }, [selectedMonth, selectedYear, financialData]);

  const rows = [...(filteredData.income || []), ...(filteredData.expense || [])].map((item, index) => ({
    id: index + 1,
    tgl_pemasukan: item.tgl_pemasukan ? dayjs(item.tgl_pemasukan).format('DD/MM/YY') : '-',
    pemasukan: item.biaya_pemasukan ? parseFloat(item.biaya_pemasukan) : '-',
    tgl_pengeluaran: item.tgl_pengeluaran ? dayjs(item.tgl_pengeluaran).format('DD/MM/YY') : '-',
    pengeluaran: item.biaya_pengeluaran ? parseFloat(item.biaya_pengeluaran) : '-',
    keterangan: item.keterangan || '-',
  }));

  const incomeRows = rows.filter(item => item.pemasukan !== '-');
  const expenseRows = rows.filter(item => item.pengeluaran !== '-');

  const incomeColumns = [
    { field: 'tgl_pemasukan', headerName: 'Tanggal Pemasukan', flex: 1, minWidth: 150 },
    { field: 'pemasukan', headerName: 'Pemasukan', flex: 1, minWidth: 150 },
  ];

  const expenseColumns = [
    { field: 'tgl_pengeluaran', headerName: 'Tanggal Pengeluaran', flex: 1, minWidth: 150 },
    { field: 'pengeluaran', headerName: 'Pengeluaran', flex: 1, minWidth: 150 },
  ];

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setSelectedMonth(newValue.month() + 1); // +1 karena bulan dimulai dari 0
    setSelectedYear(newValue.year());
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Tanggal Pemasukan", "Pemasukan", "Tanggal Pengeluaran", "Pengeluaran", "Keterangan"];
    const tableRows = rows.map(item => [
      item.id,
      item.tgl_pemasukan || '-',
      item.pemasukan || '-',
      item.tgl_pengeluaran || '-',
      item.pengeluaran || '-',
      item.keterangan || '-',
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

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    if (params.row.tgl_pemasukan !== '-') {
      setDetailType('income');
    } else {
      setDetailType('expense');
    }
    setDetailOpen(true);
  };

  const DetailPopup = ({ open, onClose, rowData, type }) => {
    if (!rowData) {
      return null; // handle the case where rowData is not available
    }

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {type === 'income' && (
              <>
                <Typography sx={{fontWeight:"bold", textAlign:'center'}}>
                  {rowData.keterangan || '-'}
                </Typography>
              </>
            )}
            {type === 'expense' && (
              <>
                <Typography sx={{fontWeight:"bold", textAlign:'center'}}>
                  {rowData.keterangan || '-'}
                </Typography>
              </>
            )}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3}}>
            <Button onClick={onClose} sx={{backgroundColor:'#69AC77'}} color="primary">Kembali</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  // Menghitung total pemasukan
  const totalPemasukan = incomeRows.reduce((acc, curr) => {
    if (curr.pemasukan && !isNaN(curr.pemasukan)) {
      return acc + parseFloat(curr.pemasukan);
    }
    return acc;
  }, 0);

  // Menghitung total pengeluaran
  const totalPengeluaran = expenseRows.reduce((acc, curr) => {
    if (curr.pengeluaran && !isNaN(curr.pengeluaran)) {
      return acc + parseFloat(curr.pengeluaran);
    }
    return acc;
  }, 0);

  const CustomFooterPemasukan= (props) => {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', backgroundColor: '#69AC77', color: 'white', mt: 4 }}>
        <Box sx={{ mr: 2 }}>
          <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
            Total Pemasukan:
          </Typography>{' '}
          <Typography variant="subtitle2" component="span">
            Rp {totalPemasukan.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    );
  };

  const CustomFooterPengeluaran = (props) => {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', backgroundColor: '#69AC77', color: 'white', mt: 4 }}>
        <Box>
          <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
            Total Pengeluaran:
          </Typography>{' '}
          <Typography variant="subtitle2" component="span">
            Rp {totalPengeluaran.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ margin: '0 auto', textAlign: 'center', width:isLargeScreen ? '400px' : '200px' }}>
        <Typography
          variant='h5'
          color='#FF9900'
          fontWeight='bold'
          sx={{ mb: '5px', textAlign:'center', fontSize:isLargeScreen ? '2em' : '1.4em' }}
        >
          Tabel Pemasukan dan Pengeluaran Kos
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <div style={{ backgroundColor: '#FF9900', borderRadius:'1em' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center', height: '2.5em' }}>
                <input ref={inputRef} {...inputProps} style={{ display: 'none' }} />
                {InputProps?.endAdornment}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CalendarTodayIcon />}
                  onClick={InputProps?.onClick}
                  sx={{
                    color: '#ffffff',
                    height: '2.5em',
                    backgroundColor: '#FF9900',
                    borderRadius: '1em',
                  }}
                >
                  {selectedDate.format("MMMM YYYY")}
                </Button>
              </Box>
            )}
          />
        </LocalizationProvider>
        </div>
        <Box 
        variant="contained"
        color="primary"
        onClick={handleMenuClick}
        sx={{ ml: 2, pr:2, pl:1 }}
        style={{ backgroundColor: '#FF9900', color: '#ffffff' }}
        display='flex'
        alignItems='center'
        borderRadius='1em'
        >
        <DownloadIcon></DownloadIcon>
        Download
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <CSVLink data={rows} filename={"financial_report.csv"} style={{ textDecoration: 'none', color: 'inherit' }}>
              .excel
            </CSVLink>
          </MenuItem>
          <MenuItem onClick={() => { exportPDF(); handleMenuClose(); }}>
            .pdf
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
        <Box sx={{ flexGrow: 1, minWidth: 280 }}>
          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={incomeRows}
              columns={incomeColumns}
              components={{ Toolbar: CustomToolbar }}
              loading={loading}
              onRowClick={handleRowClick}
              slots={{
                footer: CustomFooterPemasukan,
              }}
              columnBuffer={8}
              sx={{
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#69AC77',
                  color: '#000',
                }
              }}
            />
          </Box>
        </Box>

        {/* Expense DataGrid */}
        <Box sx={{ flexGrow: 1, minWidth: 280 }}>
          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={expenseRows}
              columns={expenseColumns}
              components={{ Toolbar: CustomToolbar }}
              loading={loading}
              onRowClick={handleRowClick}
              slots={{
                footer: CustomFooterPengeluaran,
              }}
              columnBuffer={8}
              sx={{
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#69AC77',
                  color: '#000',
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Detail Popup */}
      <DetailPopup
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        rowData={selectedRow}
        type={detailType}
      />
    </Box>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #69AC77',
  boxShadow: 4,
  width: 320,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '1em'
};

export default Laporan;
