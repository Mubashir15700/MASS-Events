import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { logoutAdmin } from "../services/api";
import { useLogin } from '../context/authProvider';
import './Sidebar.css';

export default props => {
    const { setAuth } = useLogin();

    const logout = async () => {
        let response = await logoutAdmin();
        if (response) {
            console.log(response.data);
            response.data.status === "success" ? setAuth(false) : alert(response.data.message);
        }
    }

    return (
        <Menu>
            <NavLink className="menu-item" to={"/bookings"}>
                Bookings
            </NavLink>
            <NavLink className="menu-item" to={"/payments"}>
                Payments
            </NavLink>
            <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                    logout()
                }
            >
                Log Out
            </Button>
        </Menu>
    );
};