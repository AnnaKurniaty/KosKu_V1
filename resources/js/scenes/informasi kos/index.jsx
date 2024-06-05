import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Button
} from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

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

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const paperStyle={padding :20,height:"auto",width:"auto", margin:"20px auto 25px auto", backgroundColor: theme.palette.background.alt}
  const paperStyle1={padding :20,height:"450px",width:"auto", margin:"20px auto 25px auto", backgroundColor: theme.palette.background.alt}
  const xLabels = [
    '',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const FranceGDPperCapita = [
    null,34152.773, 34292.03, 35093.824, 35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727, 36691, 36571,
    36632
  ];
  
  const UKGDPperCapita = [
    null,33271.3, 34232.426, 34865.78, 35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
  ];

  const btnstyle={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subTitle="Welcome to your dashboard" marginBottom="10em" />
      </FlexBetween>
          <Paper style={paperStyle}>
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
          >
            <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }} align="center" marginBottom={3} fontWeight="bold">
              Jumlah Ketersediaan Kamar
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 20, label: '20 Kamar Terisi', color: '#F2CA25' },
                    { id: 1, value: 10, label: '10 Kamar Kosong', color: '#FF5B45' },
                  ],
                },
              ]}
              style={{width: '99%'}}
              height={200}
            />
          </Box>
          </Paper>
          <Paper style={paperStyle1} sx={{
              overflowY: "scroll",
            }}>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
            Pengingat Jatuh Tempo
          </Typography>
          <Box
            mt="20px"
            display="grid"
            gridAutoRows="100px"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
              boxShadow: '2',
              borderRadius: '2em',
            }}
            backgroundColor= "#F9F4F4"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <Typography variant="h3" sx={{ color: theme.palette.secondary[100], marginLeft: '1em' }}>
                  Anna Kurniaty
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.secondary[100], marginLeft: '2em' }}>
                  25 Juni 2024
                </Typography>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <Button type='submit' style={btnstyle}>Lanjut</Button>
                <Button type='submit' style={btnstyle}>Tidak</Button>
              </div>
            </div>
          </Box>
          <Box
            mt="20px"
            display="grid"
            gridAutoRows="100px"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
              boxShadow: '2',
              borderRadius: '2em'
            }}
            backgroundColor= "#F9F4F4"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <Typography variant="h3" sx={{ color: theme.palette.secondary[100], marginLeft: '1em' }}>
                  Syelvie Ira Ratna M
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.secondary[100], marginLeft: '2em' }}>
                  25 Juni 2024
                </Typography>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <Button type='submit' style={btnstyle}>Lanjut</Button>
                <Button type='submit' style={btnstyle}>Tidak</Button>
              </div>
            </div>
          </Box>
          <Box
            mt="20px"
            display="grid"
            gridAutoRows="100px"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
              boxShadow: '2',
              borderRadius: '2em'
            }}
            backgroundColor= "#F9F4F4"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <Typography variant="h3" sx={{ color: theme.palette.secondary[100], marginLeft: '1em' }}>
                  Hasanah
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.secondary[100], marginLeft: '2em' }}>
                  25 Juni 2024
                </Typography>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <Button type='submit' style={btnstyle}>Lanjut</Button>
                <Button type='submit' style={btnstyle}>Tidak</Button>
              </div>
            </div>
          </Box>
        </Paper>
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }} align="center" fontWeight="bold">
            Grafik Pemasukan dan Pengeluaran
          </Typography>
          <LineChart
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            series={[
              {
                id: 'Pemasukan',
                label: 'Pemasukan',
                data: FranceGDPperCapita,
                color: '#F2CA25'
              },
              {
                id: 'Pengeluaran',
                label: 'Pengeluaran',
                data: UKGDPperCapita,
                color: '#FF5B45'
              },
            ]}
            height={400}
            margin={{ left: 70 }}
            position= "relative"
          />
        </Box>
      </Box>
  );
};

export default Dashboard;