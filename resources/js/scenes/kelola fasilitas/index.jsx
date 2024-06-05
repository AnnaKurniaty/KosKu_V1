import { useMediaQuery,Button, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import kost1 from "../../asset/kost1.jpeg";
import kost2 from "../../asset/kost2.jpeg";
import kost3 from "../../asset/kost3.jpeg";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Inventory = () => {
    const theme = useTheme()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const btnstyle={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em', }
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Daftar Gedung'/>
            <div align="right">
                <Button type='submit' style={btnstyle} onClick={() => {navigate('/tambah fasilitas');}}>Tambah</Button>
            </div>
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px"
                sx={{
                "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
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
                    <Box
                        component="img"
                        alt="kost1"
                        src={kost1}
                        height="auto"
                        width="auto"
                    ></Box>
                    <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        Gedung Pink
                    </Typography>
                    <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        4 kamar
                    </Typography>
                    <div align="center">
                        <Button type='submit' style={btnstyle} 
                            onClick={() => {
                                navigate('/fasilitas');
                            }}>Lihat Detail</Button>
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
                    <Box
                        component="img"
                        alt="kost2"
                        src={kost2}
                        height="auto"
                        width="auto"
                    ></Box>
                    <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        Gedung Orange
                    </Typography>
                    <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        15 Kamar
                    </Typography>
                    <div align="center">
                        <Button type='submit' style={btnstyle} 
                            onClick={() => {
                                navigate('/fasilitas');
                            }}>Lihat Detail</Button>
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
                    <Box
                        component="img"
                        alt="kost3"
                        src={kost3}
                        height="auto"
                        width="auto"
                    ></Box>
                    <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        Gedung Biru
                    </Typography>
                    <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                        10 Kamar
                    </Typography>
                    <div align="center">
                        <Button type='submit' style={btnstyle} 
                            onClick={() => {
                                navigate('/fasilitas');
                            }}>Lihat Detail</Button>
                    </div>
                </Box>
            </Box>
        </Box>
  );
};
export default Inventory;