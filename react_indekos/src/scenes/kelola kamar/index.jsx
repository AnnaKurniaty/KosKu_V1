import React, { useState } from 'react'
import { Box, useTheme, useMediaQuery, Typography, Button} from '@mui/material'
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import kost1 from "../../asset/kost1.jpeg";
import kost2 from "../../asset/kost2.jpeg";
import kost3 from "../../asset/kost3.jpeg";
import kost4 from "../../asset/kost4.jpeg";
import kost5 from "../../asset/kost5.jpeg";
import kost6 from "../../asset/kost6.jpeg";
import kost7 from "../../asset/kost7.jpeg";
import kost8 from "../../asset/kost8.jpeg";
import kost9 from "../../asset/kost9.jpeg";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Room = () => {
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
            <Header title='Daftar Kamar'/>
            <div align="right">
                                <Button type='submit' style={btnstyle} 
                                    onClick={() => {
                                        navigate('/tambah kamar');
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
                        <Tab label="Terisi" value="1" style={{fontWeight:'bold', fontSize:'14px'}}/>
                        <Tab label="Kosong" value="2" style={{fontWeight:'bold', fontSize:'14px'}}/>
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
                                alt="kost2"
                                src={kost2}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar B
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
                            
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
                                alt="kost7"
                                src={kost7}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar C
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost3"
                                src={kost3}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar D
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost5"
                                src={kost5}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar E
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost6"
                                src={kost6}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar F
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost4"
                                src={kost4}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar G
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost8"
                                src={kost8}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar H
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
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
                                alt="kost9"
                                src={kost9}
                                height="auto"
                                width="auto"
                            ></Box>
                            <Typography variant="h3" align='center' sx={{ color: theme.palette.secondary[100] }}>
                                Kamar I
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                                <h3>Fasilitas</h3>
                                Kamar mandi dalam <br />
                                Kasur <br />
                                Lemari <br />
                                TV <br />
                                Meja <br />
                            </Typography>
                            <div>
                            </div>
                        </Box>
                    </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default Room
