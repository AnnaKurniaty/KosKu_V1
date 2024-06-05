import * as React from 'react';
import { useMediaQuery,Button, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import ac from "../../asset/ac.jpg";
import kamarmandi from "../../asset/kamar mandi.jpg";
import kasur from "../../asset/kasur.jpg";
import kipas from "../../asset/kipas.jpg";
import lemari from "../../asset/lemari.jpg";
import meja from "../../asset/meja.jpg";
import mesincuci from "../../asset/mesin cuci.jpg";
import parkiran from "../../asset/parkir.jpg";
import wifi from "../../asset/wifi.jpg";
import dapur from "../../asset/dapur.jpg";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Inventory = () => {
    const theme = useTheme()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();
    const textStyle={backgroundColor:theme.palette.background.alt}
    const btnstyle={margin:'0.5em', backgroundColor:theme.palette.secondary[500], color:"white", padding:'0.5em 0', borderRadius: '0.5em', width: '10em'}
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Daftar Fasilitas Kos'/>
            <div align="right">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/tambah fasilitas');
                                    }}>Tambah</Button>
                            </div>
            <Box sx={{ width: 'auto', typography: 'body1' }} style={textStyle} borderRadius="0.55rem">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root.Mui-selected': {
                        color:theme.palette.secondary[500],
                        }, }}>
                    <TabList onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                        backgroundColor:theme.palette.secondary[500],
                        }
                    }}>
                        <Tab label="Fasilitas Umum" value="1" />
                        <Tab label="Fasilitas Kamar" value="2" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="dapur"
                                src={dapur}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Dapur Umum
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                12 Maret 2023
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="wifi"
                                src={wifi}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Wifi
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                19 Juni 2002
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="parkiran"
                                src={parkiran}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Parkiran
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                12 Juni 2002
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                            backgroundColor="white"
                            borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="mesincuci"
                                src={mesincuci}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Mesin Cuci
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                10 September 2010
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
                                    }}>Lihat Detail</Button>
                            </div>
                        </Box>
                    </Box>
                    </TabPanel>
                    <TabPanel value="2">
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="kasur"
                                src={kasur}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kasur
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                19 September 2010
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="kipas"
                                src={kipas}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kipas
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                20 Januari 2020
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="ac"
                                src={ac}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                AC
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                20 Februari 2020
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="lemari"
                                src={lemari}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Lemari
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                30 Februari 2010
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="meja"
                                src={meja}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Meja
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                8 Maret 2010
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
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
                        backgroundColor="white"
                        borderRadius="0.55rem"
                        >
                            <Box
                                component="img"
                                alt="kamarmandi"
                                src={kamarmandi}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar Mandi
                            </Typography>
                            <Typography variant="h6" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                10 Januari 2002
                            </Typography>
                            <div align="center">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/detail fasilitas');
                                    }}>Lihat Detail</Button>
                            </div>
                        </Box>
                    </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
  );
};
export default Inventory;