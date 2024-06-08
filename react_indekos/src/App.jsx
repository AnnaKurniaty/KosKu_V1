import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider'; // Import ContextProvider
import Layout from './scenes/layout';
import InformasiKos from './scenes/informasi kos';
import KelolaFasilitas from './scenes/kelola kamar';
import KelolaPenyewa from './scenes/kelola penyewa';
import KelolaGedung from './scenes/kelola gedung';
// import KelolaPenyewaDetail from './scenes/kelola penyewa/detail';
import KelolaFasilitasKamarDetail from './scenes/kelola fasilitas/detail_kamar';
import KelolaFasilitasUmumDetail from './scenes/kelola fasilitas/detail_umum';
import TambahFasilitas from './scenes/kelola kamar/tambah';
import TambahGedung from './scenes/kelola gedung/tambah';
import Laporan from './scenes/laporan';
import Login from './scenes/login';
import Register from './scenes/Register';
import Penyewa from './scenes/Penyewa';
import NoMatch from './scenes/NoMatch';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ContextProvider>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/penyewa' element={<Penyewa />} />
              <Route element={<Layout />}>
                <Route path='/' element={<Navigate to='/dashboard/:id' replace />} />
                <Route path='/dashboard/:id' element={<InformasiKos />} />
                <Route path='/kelola gedung dan fasilitas/:id' element={<KelolaGedung />} />
                <Route path='/tambah-gedung' element={<TambahGedung />} />
                {/* <Route path='/tambah kamar' element={<TambahKamar />} /> */}
                <Route path='/kelola penyewa' element={<KelolaPenyewa />} />
                <Route path='/tambah-fasilitas' element={<TambahFasilitas />} />
                {/* <Route path='/detail penyewa' element={<KelolaPenyewaDetail />} /> */}
                <Route path='/detail-fasilitas-kamar' element={<KelolaFasilitasKamarDetail />} />
                <Route path='/detail-fasilitas-umum' element={<KelolaFasilitasUmumDetail />} />
                <Route path='/kelola fasilitas/:id' element={<KelolaFasilitas />} />
                <Route path='/Laporan pemasukan & pengeluaran/:id' element={<Laporan />} />
              </Route>
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
