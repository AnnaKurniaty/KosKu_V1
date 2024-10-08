import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { removeUserId } from "../utils";
import { setUser } from "../state";
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";

const NavBar = ({ user, isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState('')
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  }

  const search = () => {
    navigate(`/${query.toLowerCase()}`)
  }
  const handleLogout = () => {
    setAnchorEl(null);
    removeUserId()
    setUser('')
    navigate('/login')
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}} >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <span>Menu</span><MenuIcon />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;