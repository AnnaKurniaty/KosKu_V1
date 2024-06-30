import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  PointOfSaleOutlined,
} from "@mui/icons-material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from "react-router-dom";
import logoImage from "../asset/logo.png";
import profileImage from "../asset/profile.jpeg";
import axiosClient from "../axios-client";
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../state/actions';
import { useLocation } from 'react-router-dom';

const navItems = [
  {
    text: "Informasi Kos",
    icon: <HomeOutlined />,
  },
  {
    text: "Kelola Gedung dan Fasilitas",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kelola Penyewa",
    icon: <Groups2Outlined />,
  },
  {
    text: "Laporan Pemasukan & Pengeluaran",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Keluar",
    icon: <SettingsOutlined />,
  },
];

const SideBar = ({
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) => {
  const sidebarRef = useRef(null); // Ref untuk sidebar element
  const { pathname } = useLocation();
  const active = useSelector((state) => state.activePage);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosClient.get('/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    // Fungsi untuk menangkap klik di luar sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSideBarOpen(false);
      }
    };

    // Menambah event listener saat komponen dimount
    document.addEventListener('mousedown', handleClickOutside);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSideBarOpen]);

  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout', null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          ref={sidebarRef} // Menghubungkan ref dengan sidebar element
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: "#69AC77",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              borderRadius: "0 7rem 7rem 0",
            },
          }}
        >
          <Box width="100%" borderRadius="10rem">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" backgroundColor={theme.palette.background.alt} marginLeft='2em' padding='0.5em' borderRadius='1em'>
                  <Box
                    component="img"
                    alt="logo"
                    src={logoImage}
                    color={"white"}
                    height="58px"
                    width="84px"
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
            {/* <Typography>Menu</Typography> */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (lcText === 'keluar') {
                          handleLogout();
                        } else {
                          navigate(`/${lcText}/${user.id}`, { state: { userId:user.id } });
                          setUser(user);
                          dispatch(setActivePage(lcText));
                        }
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[900]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "white"
                              : "white",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: "white" }}/>
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {!loading && user && (
              <Box display="flex" alignItems="center" height={80} backgroundColor={theme.palette.background.alt} borderRadius={3} margin={3}>
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="54px"
                  width="54px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                  marginLeft={3}
                  onClick={() => {
                    navigate(`/pemilik/${user.id}`, { state: { userId: user.id } });
                }}
                />
                <div>
                  <Typography marginLeft={2} color={"black"}>
                    {user.nama_lengkap}
                  </Typography>
                  <Typography marginLeft={2} variant="subtitle2">
                    Pemilik
                  </Typography>
                </div>
              </Box>
            )}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
