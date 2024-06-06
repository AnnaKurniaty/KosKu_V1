import React, { useEffect, useState } from "react";
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
    text: "Dashboard",
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
  // const { pathname } = useLocation();
  const active = useSelector((state) => state.activePage);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

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
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              borderRadius: "0 7rem 7rem 0",
            },
          }}
        >
          <Box width="100%" borderRadius="10rem" height={"100%"}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    component="img"
                    alt="logo"
                    src={logoImage}
                    color={"white"}
                    height="58px"
                    width="84px"
                    marginLeft={"2em"}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
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
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {!loading && user && (
              <Box display="flex" alignItems="center" height={80} backgroundColor="#69AC77" borderRadius={3} margin={3}>
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="54px"
                  width="54px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                  marginLeft={3}
                />
                <div>
                  <Typography marginLeft={2} color={"white"}>
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
