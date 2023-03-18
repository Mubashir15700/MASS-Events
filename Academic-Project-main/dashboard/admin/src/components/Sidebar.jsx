import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@mui/material";
import { BsPersonCircle, BsFillClipboard2CheckFill, BsFillCreditCardFill, } from "react-icons/bs";
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
            <div style={{ color: '#373a47', marginBottom: 40 }}>
                <p style={{ fontSize: 50 }}><BsPersonCircle /></p>
                {props.user}
            </div>
            <NavLink className="menu-item" to={"/eventsstatus"}>
                <BsFillClipboard2CheckFill style={{ marginRight: 5 }} />
                Events Status
            </NavLink>
            <NavLink className="menu-item" to={"/prevpayments"}>
                <BsFillCreditCardFill style={{ marginRight: 5 }} />
                Prev Payments
            </NavLink>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: 30 }}
                onClick={() =>
                    logout()
                }
            >
                Log Out
            </Button>
        </Menu>
    );
};