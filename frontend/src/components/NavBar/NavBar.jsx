import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import fetchUserContacts from "../../pages/HomePage/HomePage"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import ContactForm from "../ContactForm/ContactForm";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li>
          <Link to="/calendar">
            <IconButton variant="contained"><CalendarMonthIcon/></IconButton>
          </Link>
        </li>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Relationship Manager</b>
          </Link>
        </li>
        <li>
          {user ? (
            <IconButton onClick={logoutUser}><LogoutIcon/></IconButton>
          ) : (
            <IconButton onClick={() => navigate("/login")}><LoginIcon/></IconButton>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
