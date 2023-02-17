import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { logoutAdmin } from "../services/api";
import './Sidebar.css';

export default props => {
    return (
        <Menu>
            <NavLink className="menu-item" to={"/addevent"}>
                Add Event
            </NavLink>
            <NavLink className="menu-item" to={"/addstaff"}>
                Add Staff
            </NavLink>
            <Button
                variant="contained" 
                color="secondary"
                onClick={() => 
                    logoutAdmin()
                }
            >
                Log Out
            </Button>
        </Menu>
    );
};