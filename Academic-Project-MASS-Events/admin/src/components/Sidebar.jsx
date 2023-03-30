import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@mui/material";
import { 
    BsPersonCircle, 
    BsFillClipboard2CheckFill, 
    BsFillCreditCardFill, 
    BsFillTelephoneFill, 
    BsBoxArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { logoutAdmin } from "../services/api";
import { useLogin } from '../context/authProvider';
import './Sidebar.css';

const Sidebar = (props) => {
    const { setAuth } = useLogin();

    const logout = async () => {
        let response = await logoutAdmin();
        if (response) {
            alert(response.data.message);
            response.data.status === "success" && setAuth(false); 
        }
    }

    return (
        <Menu>
            <div style={{ color: '#373a47', marginBottom: 80 }}>
                <p style={{ fontSize: 80, color: '#fff' }}><BsPersonCircle /></p>
                <p style={{ fontSize: 25, fontWeight: 'bold', color: '#e5e5e5' }}>{props.user.username}</p>
                <p style={{ color: '#e5e5e5' }}><BsFillTelephoneFill /> {props.user.phone}</p>
            </div>
            <NavLink className="menu-item" to={"/events_status"}>
                <BsFillClipboard2CheckFill style={{ marginRight: 5 }} />
                Events Status
            </NavLink>
            <NavLink className="menu-item" to={"/prev_payments"}>
                <BsFillCreditCardFill style={{ marginRight: 5 }} />
                Prev Payments
            </NavLink>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: 180 }}
                onClick={() =>
                    logout()
                }
            >
                <BsBoxArrowRight size={20} /> Log Out
            </Button>
        </Menu>
    );
};

export default Sidebar;