import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axiosClient.get('/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          setUser(data.user);
          setLoading(false);
        })
        .catch(() => {
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, setUser, setToken]);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner/component
  }

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        drawerWidth='250px'
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        isNonMobile={isNonMobile}
      />
      <Box flexGrow={1}>
        <NavBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
